import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import test from 'node:test';
import {load} from '../scripts/catalog.mjs';
import {validateDevices} from '../scripts/devices.mjs';
import {axisPoints,createWorkspace,groupRows,hasVisibleLight} from '../web/workspace-data.js';

const data=JSON.parse(readFileSync(new URL('../data/devices.json',import.meta.url)));
const catalog=load();
const lens=createWorkspace(catalog,data).domains.find(domain=>domain.id==='metalens');
const rows=lens.rows.filter(row=>row.study_id==='colburn2020quartic');
const sample=id=>rows.find(row=>row.id==='colburn2020quartic_'+id).values;
const waves=[455,530,625];

test('quartic doublet MTF10 is a cross-wavelength fixed-plane result with independent source traces',()=>{
  assert.deepEqual(groupRows(rows).map(group=>group.paper),['device-colburn_quartic_2020']);
  assert.equal(rows.length,32);
  assert.equal(new Set(rows.map(row=>row.specimen_id)).size,9);
  assert.ok(rows.every(row=>hasVisibleLight(lens,row)));
  for(const [d,plane,mtf,panels] of [[100,1500,9.6,['F','E','D']],[50,3000,11,['L','K','J']]]){
    const values=sample('edof_d'+d+'_mtf10');
    assert.equal(values.psf_protocol.evaluation_plane_um,plane);
    assert.equal(values.psf_protocol.collection_objective_na,.42);
    assert.equal(values.spectral_mean_mtf10_cycles_mm.value,mtf);
    assert.equal(values.spectral_mean_mtf10_cycles_mm.threshold_fraction,.1);
    assert.equal(values.spectral_mean_mtf10_cycles_mm.frequency_unit,'cycles/mm');
    assert.equal(values.wavelength_nm,undefined);
    assert.equal(values.mtf_curve.frequency_unit,'lp/mm');
    assert.equal(values.mtf_curve.decibel_convention,null);
    assert.equal(values.mtf_curve.data_availability.raw_psf,null);
    for(const [index,wave] of waves.entries()){
      const v=sample('edof_d'+d+'_psf_'+wave);
      assert.equal(v.wavelength_nm.value,wave);
      assert.equal(v.wavelength_nm.illumination_bandwidth_nm,[25,30,15][index]);
      assert.match(v.fwhm_um.location,new RegExp('5'+panels[index]));
      assert.equal(v.measured_focal_um.value,null);
      assert.equal(v.axial_focus_offset_um.value,null);
      assert.equal(v.spectral_mean_mtf10_cycles_mm,undefined);
    }
  }
  assert.equal(axisPoints(rows,'design_focal_um','spectral_mean_mtf10_cycles_mm').length,2);
  assert.equal(axisPoints(rows,'wavelength_nm','measured_focal_um').length,0);
});

test('quartic doublet aperture, diffraction power ratio and reconstruction preserve their scope',()=>{
  const summary=sample('summary');
  assert.equal(summary.aperture_width_um.value,1000);
  assert.equal(summary.aperture_width_um.aperture_shape,'square');
  assert.equal(summary.diameter_um,undefined);
  assert.equal(summary.na.value,null);
  assert.equal(summary.diffraction_efficiency_mean_pct.value,37);
  assert.equal(summary.efficiency_protocol.denominator,'aperture_area_integral_at_second_metasurface_plane');
  assert.equal(summary.efficiency_band_mean_pct,undefined);
  assert.equal(sample('edof_d75_z530').design_focal_um.calculation_origin,'atlas');
  assert.equal(sample('edof_d25_white_captured').chromatic.basis,'measured');
  assert.equal(sample('edof_d25_white_deconvolved').chromatic.basis,'reconstruction');
  assert.equal(sample('simulated_correlation').fov_deg.basis,'model');
  assert.equal(validateDevices(data,catalog),true);
  const raw=data.domains.metalens.rows.find(row=>row.id==='colburn2020quartic_edof_d50_mtf10').values;
  const mean=data.domains.metalens.rows.find(row=>row.id==='colburn2020quartic_summary').values;
  try{
    raw.spectral_mean_mtf10_cycles_mm.threshold_fraction=.5;
    mean.diffraction_efficiency_mean_pct.denominator='incident_through_aperture';
    assert.throws(()=>validateDevices(data,catalog),/spectral mean PSF MTF10 context\ndiffraction efficiency mean context|diffraction efficiency mean context\nspectral mean PSF MTF10 context/);
  }finally{
    raw.spectral_mean_mtf10_cycles_mm.threshold_fraction=.1;
    mean.diffraction_efficiency_mean_pct.denominator=mean.efficiency_protocol.denominator;
  }
});

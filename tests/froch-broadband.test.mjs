import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {load} from '../scripts/catalog.mjs';
import {validateDevices} from '../scripts/devices.mjs';
import {createWorkspace,groupRows,axisPoints,hasVisibleLight,valueSources} from '../web/workspace-data.js';
const data=JSON.parse(fs.readFileSync(new URL('../data/devices.json',import.meta.url))),catalog=load(),atlas=createWorkspace(catalog,data);
const lens=atlas.domains.find(d=>d.id==='metalens'),rows=lens.rows.filter(r=>r.study_id==='froch2025'),get=id=>rows.find(r=>r.id==='froch2025_'+id).values;

test('the new 2025 publication groups real optical structures and separate measurement systems without counting spectra as specimens',()=>{
 assert.equal(validateDevices(data,catalog),true);assert.equal(rows.length,439);assert.equal(new Set(rows.map(r=>r.specimen_id)).size,10);assert.equal(groupRows(rows).length,1);
 assert.ok(rows.every(r=>r.paper==='device-froch_broadband_2025'&&hasVisibleLight(lens,r)));
 assert.equal(atlas.sources.get('device-froch_broadband_si_2025').publication_source,'device-froch_broadband_2025');
 assert.equal(atlas.sources.get('device-froch_broadband_2025').bibliography.locator,'3025');
 for(const r of rows)for(const v of Object.values(r.values))for(const id of valueSources(v))assert.ok(atlas.sources.has(id));
 assert.match(rows[0].pointLabel,/3025/);assert.match(lens.rows.find(r=>r.study_id==='zhang2025').pointLabel,/7485/);
});

test('all 420 S9 image conditions preserve structure, wavelength and field angle without invented widths or focal lengths',()=>{
 const grid=rows.filter(r=>/^froch2025_(refractive|hyperboloid|edof|poly|broadband)_\d+_a\d+$/.test(r.id));assert.equal(grid.length,420);
 const keys=new Set(grid.map(r=>`${r.specimen_id}/${r.values.wavelength_nm.value}/${r.values.aoi_deg.value}`));assert.equal(keys.size,420);
 for(const spec of ['refractive','hyperboloid','edof','poly','broadband']){
  const selected=grid.filter(r=>r.specimen_id===spec);assert.equal(selected.length,84);assert.deepEqual([...new Set(selected.map(r=>r.values.wavelength_nm.value))],Array.from({length:21},(_,i)=>480+10*i));
  assert.deepEqual([...new Set(selected.map(r=>r.values.aoi_deg.value))],[0,5,10,15]);
 }
 for(const r of grid){const v=r.values;assert.equal(v.measured_focal_um.value,null);assert.equal(v.fwhm_um.value,null);assert.equal(v.diameter_um.value,10000);assert.equal(v.design_focal_um.value,20000);assert.equal(v.na.value,null);assert.equal(v.aoi_deg.azimuth_deg,null);assert.equal(v.strehl,undefined);}
 assert.equal(axisPoints(rows,'wavelength_nm','measured_focal_um').length,0);assert.equal(axisPoints(rows,'wavelength_nm','fwhm_um').length,0);assert.equal(axisPoints(rows,'wavelength_nm','aoi_deg').length,426);
});

test('six axial scans keep their different optical sampling and never turn an extended focus into zero chromatic shift',()=>{
 const axial=rows.filter(r=>r.id.includes('_axial_'));assert.deepEqual(axial.map(r=>r.values.wavelength_nm.value),[450,500,550,600,650,700]);
 for(const r of axial){const v=r.values;assert.equal(r.specimen_id,'broadband');assert.match(v.psf_protocol.value,/7.5μm/);assert.match(v.psf_protocol.note,/5.6\/20/);assert.equal(v.measured_focal_um.value,null);assert.equal(v.focus_variation_um,undefined);assert.equal(v.focus_variation_pct,undefined);assert.equal(v.efficiency_protocol,undefined);}
});

test('PSF Fourier thresholds, peak-count ratios, line-pair contrast and reconstructed output retain distinct meanings',()=>{
 const summary=get('broadband_summary'),pre=get('broadband_contrast_captured'),post=get('broadband_contrast_deconvolved');
 assert.equal(summary.mtf_curve.data_availability.threshold,.01);assert.equal(summary.mtf_curve.data_availability.raw_psf,null);assert.equal(summary.mtf_curve.data_availability.independently_recomputed_mtf,null);
 assert.match(summary.efficiency_protocol.note,/不录到efficiency_at_lambda_pct/);assert.equal(pre.system_contrast_protocol.basis,'derived_from_measurement');assert.equal(post.system_contrast_protocol.basis,'reconstruction');
 for(const v of [pre,post]){assert.equal(v.aoi_deg.value,null);assert.equal(v.wavelength_nm.value,null);assert.equal(v.system_contrast_protocol.direction_aggregation,'mean_of_horizontal_vertical');assert.equal(v.system_contrast_protocol.sample_wavelengths_nm.length,101);assert.equal(v.system_contrast_protocol.field_point,null);}
 assert.match(post.mtf_curve.note,/20%或更高/);assert.ok(rows.every(r=>r.values.efficiency_at_lambda_pct===undefined&&r.values.efficiency_band_mean_pct===undefined));assert.equal(axisPoints(lens.rows,'efficiency_lambda_nm','efficiency_at_lambda_pct').length,92);assert.equal(axisPoints(lens.rows,'wavelength_nm','measured_focal_um').length,15);
 assert.equal(get('ambient_camera').fov_deg.direction,'diagonal');assert.equal(get('paired_diffusion').fov_deg,undefined);
});

test('incidence angle cannot silently acquire an assumed azimuth, missing reference or a different optical protocol',()=>{
 for(const change of [r=>r.values.aoi_deg.value=100,r=>delete r.values.aoi_deg.azimuth_deg,r=>r.values.aoi_deg.angle_reference='full_fov',r=>delete r.values.psf_protocol]){
  const d=structuredClone(data);change(d.domains.metalens.rows.find(r=>r.id==='froch2025_broadband_680_a15'));assert.throws(()=>validateDevices(d,catalog),/PSF incidence angle context/);
 }
});

test('system contrast validation prevents S/T relabeling and raw/reconstruction or spectral aggregation conflation',()=>{
 for(const change of [r=>r.values.system_contrast_protocol.direction_aggregation='sagittal_tangential',r=>r.values.system_contrast_protocol.basis='measured',r=>r.values.system_contrast_protocol.processing_stage='captured',r=>delete r.values.system_contrast_protocol.field_point,r=>r.values.wavelength_nm.value=580]){
  const d=structuredClone(data);change(d.domains.metalens.rows.find(r=>r.id==='froch2025_broadband_contrast_deconvolved'));assert.throws(()=>validateDevices(d,catalog),/system line-pair contrast context/);
 }
});

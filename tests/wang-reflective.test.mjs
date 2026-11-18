import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import test from 'node:test';
import {load} from '../scripts/catalog.mjs';
import {validateDevices} from '../scripts/devices.mjs';
import {axisPoints,createWorkspace,groupRows,hasVisibleLight} from '../web/workspace-data.js';

const data=JSON.parse(readFileSync(new URL('../data/devices.json',import.meta.url)));
const catalog=load();
const lens=createWorkspace(catalog,data).domains.find(domain=>domain.id==='metalens');
const rows=lens.rows.filter(row=>row.study_id==='wang2017reflect');
const sample=id=>rows.find(row=>row.id==='wang2017reflect_'+id).values;

test('Wang 2017 labels the actual axial-scan spectra separately from the continuous design and simulations',()=>{
  assert.equal(rows.length,24);
  assert.equal(new Set(rows.map(row=>row.specimen_id)).size,13);
  assert.deepEqual(groupRows(rows).map(group=>group.paper),['device-wang_reflect_2017']);
  assert.ok(rows.every(row=>!hasVisibleLight(lens,row)));
  const main=sample('f100_summary');
  assert.deepEqual([main.diameter_um.value,main.na.value,main.design_focal_um.value],[55.55,.268,100]);
  assert.ok(sample('f65_summary').diameter_um.value===null);
  assert.deepEqual(sample('f150_summary').na.author_reported_values,{main_figure:.217,supplementary_design:.218,supplementary_image_caption:.216});
  assert.equal(sample('f150_summary').na.value,null);
  for(const wave of [1200,1300,1400,1500,1600,1650]){
    const e=sample('f100_exp_'+wave);
    const m=sample('f100_cst_'+wave);
    assert.equal(e.wavelength_nm.value,wave);
    assert.equal(m.wavelength_nm.value,wave);
    assert.equal(e.wavelength_nm.basis,'measured');
    assert.equal(m.wavelength_nm.basis,'model');
    assert.equal(e.lambda_max_nm.value,1680);
    assert.equal(e.measured_focal_um.value,null);
    assert.equal(m.simulated_focal_um.value,null);
    assert.equal(m.psf_protocol.simulation_geometry,'cylindrical');
  }
  assert.deepEqual([sample('high_na_model').na.value,sample('high_na_model').design_focal_um.value],[.86,4]);
  assert.equal(sample('high_na_model').na.basis,'model');
  assert.equal(axisPoints(rows,'wavelength_nm','measured_focal_um').length,0);
});

test('Wang 2017 maxima are author spectral maxima with metal-mirror intensity references',()=>{
  for(const [f,peak] of [[65,8.56],[100,12.44],[150,8.4]]){
    const v=sample('f'+f+'_summary');
    assert.equal(v.mirror_referenced_efficiency_max_pct.value,peak);
    assert.equal(v.mirror_referenced_efficiency_max_pct.statistic,'spectral_maximum');
    assert.equal(v.mirror_referenced_efficiency_max_pct.peak_wavelength_nm,null);
    assert.equal(v.efficiency_protocol.denominator,'metallic_mirror_reflected_intensity_same_pixel_size');
    assert.equal(v.efficiency_at_lambda_pct,undefined);
  }
  assert.equal(axisPoints(rows,'design_focal_um','mirror_referenced_efficiency_max_pct').length,3);
  assert.equal(validateDevices(data,catalog),true);
  const original=data.domains.metalens.rows;
  const index=original.findIndex(row=>row.id==='wang2017reflect_f100_summary');
  const changed=structuredClone(original[index]);
  changed.values.efficiency_protocol.denominator='incident_through_aperture';
  const updated={...data,domains:{...data.domains,metalens:{...data.domains.metalens,rows:original.with(index,changed)}}};
  assert.throws(()=>validateDevices(updated,catalog),/mirror-referenced efficiency maximum context/);
});

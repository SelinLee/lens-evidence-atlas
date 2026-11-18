import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import test from 'node:test';
import {load} from '../scripts/catalog.mjs';
import {validateDevices} from '../scripts/devices.mjs';
import {axisPoints,createWorkspace,groupRows,hasVisibleLight} from '../web/workspace-data.js';

const data=JSON.parse(readFileSync(new URL('../data/devices.json',import.meta.url)));
const catalog=load();
const lens=createWorkspace(catalog,data).domains.find(domain=>domain.id==='metalens');
const rows=lens.rows.filter(row=>row.study_id==='arbabi2018dual');
const sample=id=>rows.find(row=>row.id==='arbabi2018dual_'+id).values;

test('Arbabi pairs actual same-specimen axial peaks without assigning them to nominal design wavelengths',()=>{
  assert.deepEqual(groupRows(rows).map(group=>group.paper),['device-arbabi_dual_2018']);
  assert.equal(rows.length,10);
  assert.equal(new Set(rows.map(row=>row.specimen_id)).size,5);
  assert.equal(rows.filter(row=>hasVisibleLight(lens,row)).length,8);
  const summary=sample('summary');
  assert.deepEqual([summary.diameter_um.value,summary.na.value,summary.design_focal_um.value],[1600,.5,1386]);
  assert.deepEqual(summary.design_focal_um.nominal_design_wavelengths_nm,[605,820]);
  assert.equal(summary.lambda_min_nm,undefined);
  assert.equal(summary.lambda_max_nm,undefined);
  assert.equal(summary.focus_variation_um.value,4);
  assert.equal(summary.focus_variation_um.calculation_origin,'atlas');
  assert.equal(summary.mtf_curve.data_availability.raw_psf,null);
  for(const [wave,peak,width,pol] of [[600,1380,.68,'y'],[822,1376,.93,'x']]){
    const v=sample('dw_psf_'+wave);
    assert.equal(v.wavelength_nm.value,wave);
    assert.equal(v.polarization.polarization_axis,pol);
    assert.equal(v.measured_focal_um.value,peak);
    assert.equal(v.fwhm_um.value,width);
  }
  assert.equal(axisPoints(rows,'wavelength_nm','measured_focal_um').length,2);
  assert.equal(axisPoints(rows,'na','focus_variation_um').length,1);
});

test('Arbabi finite-band power and the monochromatic estimate remain distinct',()=>{
  for(const [wave,diameter,efficiency,band] of [[600,5,27,10],[822,10,61,null]]){
    const v=sample('dw_eff_'+wave);
    assert.equal(v.wavelength_nm.value,wave);
    assert.equal(v.efficiency_at_lambda_pct.value,efficiency);
    assert.equal(v.efficiency_protocol.integration_diameter_um,diameter);
    assert.equal(v.efficiency_protocol.denominator,'total_incident_power');
    assert.equal(v.efficiency_protocol.illumination_bandwidth_nm,band);
  }
  assert.equal(sample('model_band').simulated_focusing_efficiency_pct.value,38);
  assert.equal(sample('model_center').simulated_focusing_efficiency_pct.value,63);
  assert.equal(sample('red_estimate').efficiency_at_lambda_pct.estimated_single_wavelength_efficiency_pct,45);
  assert.equal(sample('red_estimate').efficiency_at_lambda_pct.value,null);
  assert.equal(axisPoints(rows,'efficiency_lambda_nm','efficiency_at_lambda_pct').length,2);
  assert.equal(validateDevices(data,catalog),true);
  const sourceRows=data.domains.metalens.rows;
  const index=sourceRows.findIndex(row=>row.id==='arbabi2018dual_summary');
  const summary=structuredClone(sourceRows[index]);
  const changed={...data,domains:{...data.domains,metalens:{...data.domains.metalens,rows:sourceRows.with(index,summary)}}};
  const variation=summary.values.focus_variation_um;
  variation.value=20;
  assert.throws(()=>validateDevices(changed,catalog),/focal variation context/);
  variation.value=4;
  variation.measurement_record_ids[1]='arbabi2018dual_ref';
  assert.throws(()=>validateDevices(changed,catalog),/focal variation context/);
});

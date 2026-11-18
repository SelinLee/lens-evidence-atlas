import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import test from 'node:test';
import {load} from '../scripts/catalog.mjs';
import {axisPoints,createWorkspace,groupRows,hasVisibleLight} from '../web/workspace-data.js';

const data=JSON.parse(readFileSync(new URL('../data/devices.json',import.meta.url)));
const atlas=createWorkspace(load(),data);
const lens=atlas.domains.find(domain=>domain.id==='metalens');
const rows=lens.rows.filter(row=>row.study_id==='wang2021');
const sample=id=>rows.find(row=>row.id==='wang2021_'+id).values;
const wavelengths=[650,700,800,900,1000];

test('Wang red-to-near-infrared experiment reuses its application citation and preserves source conflicts',()=>{
  assert.deepEqual(groupRows(rows).map(group=>group.paper),['wang_low_na_2021']);
  assert.equal(atlas.sources.get('wang_low_na_2021_si').publication_source,'wang_low_na_2021');
  assert.equal(rows.length,23);
  assert.equal(new Set(rows.map(row=>row.specimen_id)).size,6);
  assert.equal(rows.filter(row=>hasVisibleLight(lens,row)).length,13);
  for(const config of ['exp24','exp10']){
    const values=sample(config+'_summary');
    assert.equal(values.height_nm.value,1500);
    assert.equal(values.efficiency_protocol.denominator,'incident_through_aperture');
    assert.equal(values.efficiency_protocol.integration_radius_multiple_of_fwhm,3);
    assert.equal(values.mtf_curve.data_availability.author_repository_status,'link_expired');
    assert.deepEqual(wavelengths.map(w=>sample(config+'_eff_'+w).wavelength_nm.value),wavelengths);
  }
  const typical=sample('exp24_summary');
  assert.equal(typical.design_focal_um.value,60);
  assert.equal(typical.measured_focal_um.value,null);
  assert.deepEqual(typical.strehl.bound,{operator:'>',value:.81});
  assert.deepEqual(typical.fwhm_um.relative_deviation_bound_pct,{operator:'<',value:9});
  assert.ok(wavelengths.every(w=>sample('exp24_psf_'+w).measured_focal_um.value===null));
  const conflict=sample('exp10_eff_700').efficiency_at_lambda_pct;
  assert.equal(conflict.value,null);
  assert.equal(conflict.author_reported_efficiency_pct,90.2);
  assert.deepEqual(conflict.sourceIds,['wang_low_na_2021','wang_low_na_2021_si']);
  const mean=sample('exp10_summary').efficiency_band_mean_pct;
  assert.deepEqual([mean.value,mean.supplement_reported_pct],[88.5,88.1]);
  assert.equal(mean.basis,'derived_from_measurement');
  assert.equal(axisPoints(rows,'wavelength_nm','efficiency_at_lambda_pct').length,3);
  assert.equal(axisPoints(rows,'wavelength_nm','measured_focal_um').length,0);
});

test('Wang groups the model and the USAF chart with distinct evidence and geometries',()=>{
  for(const [id,mean] of [['model24_summary',83],['model10_summary',93],['visible_model',88.3]]){
    const values=sample(id);
    assert.equal(values.efficiency_band_mean_pct.value,mean);
    assert.equal(values.efficiency_band_mean_pct.basis,'model');
    assert.equal(values.efficiency_protocol.denominator,'author_denominator_unreported');
  }
  assert.equal(axisPoints(rows,'wavelength_nm','simulated_focusing_efficiency_pct').length,2);
  const chart=sample('usaf_650');
  assert.equal(chart.resolved_test_line_width_um.value,1.38);
  assert.equal(chart.resolved_test_line_width_um.target_group,8);
  assert.equal(chart.resolved_test_line_width_um.target_element,4);
  assert.equal(chart.resolved_test_line_width_um.field_point,null);
  assert.equal(chart.resolved_test_line_width_um.contrast_threshold,null);
  assert.equal(chart.measured_focal_um,undefined);
});

import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import test from 'node:test';
import {load} from '../scripts/catalog.mjs';
import {validateDevices} from '../scripts/devices.mjs';
import {axisPoints,createWorkspace,groupRows,hasVisibleLight} from '../web/workspace-data.js';

const data = JSON.parse(readFileSync(new URL('../data/devices.json',import.meta.url)));
const catalog = load();
const lens = createWorkspace(catalog,data).domains.find(domain => domain.id==='metalens');
const rows = lens.rows.filter(row => row.study_id==='li2026mosaic');
const sample = id => rows.find(row => row.id==='li2026mosaic_'+id).values;

test('Li mosaic retains one NIR publication and all eleven Supplementary Table S2 rows',()=>{
  assert.equal(rows.length,19);
  assert.equal(new Set(rows.map(row => row.specimen_id)).size,4);
  assert.deepEqual(groupRows(rows).map(group => group.paper),['device-li_mosaic_2026']);
  assert.ok(rows.every(row => !hasVisibleLight(lens,row)));
  const table = [
    [1200,6.82,.06,.809,.006,.064],[1220,5.98,.15,.705,.015,.159],[1240,6.18,.11,.793,.012,.107],
    [1260,5.65,.14,.755,.016,.162],[1280,6.32,.17,.771,.017,.157],[1300,5.43,.14,.859,.019,.151],
    [1320,5.38,.14,.871,.019,.132],[1340,6.55,.25,.794,.025,.239],[1360,6.23,.18,.789,.019,.217],
    [1380,6.40,.17,.759,.017,.181],[1400,8.82,.34,.623,.019,.298],
  ];
  for(const [i,[wave,width,widthError,sr,srError,lobes]] of table.entries()){
    const v=sample(wave);
    assert.deepEqual([v.diameter_um.value,v.na.value,v.wavelength_nm.value],[8100,.15,wave]);
    assert.deepEqual([v.fwhm_um.value,v.strehl.value,v.psf_sidelobe_mainlobe_ratio.value],[width,sr,lobes]);
    assert.deepEqual([v.fwhm_um.reported_error.value,v.strehl.reported_error.value],[widthError,srError]);
    assert.equal(v.strehl.reported_error.type,'not_specified');
    assert.match(v.fwhm_um.location,new RegExp('Table S2，第 '+(i+1)+' 行'));
    assert.equal(v.measured_focal_um.value,null);
  }
  assert.equal(sample('main').strehl.value,.78);
  assert.equal(sample('main').focus_variation_protocol.reference_plane_um,27760);
  assert.equal(sample('main').focus_variation_um.value,null);
  assert.equal(sample('main').design_focal_um.value,null);
  assert.equal(axisPoints(rows,'wavelength_nm','fwhm_um').length,11);
  assert.equal(axisPoints(rows,'wavelength_nm','strehl').length,11);
  assert.equal(axisPoints(rows,'wavelength_nm','psf_sidelobe_mainlobe_ratio').length,11);
});

test('The spectrum-labelled control peaks and dual-sample efficiencies stay with their devices',()=>{
  assert.deepEqual(axisPoints(rows,'wavelength_nm','measured_focal_um').map(point => [point.x,point.y]),
    [[1230,27200],[1280,26100],[1330,25100]]);
  assert.equal(sample('control').diameter_um.value,null);
  assert.equal(sample('control').focus_variation_um.value,2000);
  assert.equal(sample('main').efficiency_at_lambda_pct.value,null);
  assert.equal(sample('dual_1').wavelength_nm.value,null);
  assert.deepEqual(sample('dual_1').wavelength_nm.conflicting_values_nm,[1001,1006]);
  assert.equal(sample('dual_1').efficiency_at_lambda_pct.author_reported_efficiency_pct,25.4);
  assert.equal(sample('dual_2').efficiency_protocol.integration_radius_um,null);
  assert.equal(sample('dual_2').efficiency_protocol.denominator,'author_denominator_unreported');
  assert.deepEqual(axisPoints(rows,'efficiency_lambda_nm','efficiency_at_lambda_pct').map(point => [point.x,point.y]),[[1215,37.5]]);
});

test('The published line profile retains its real figure and worksheet provenance without offering MTF',()=>{
  assert.equal(validateDevices(data,catalog),true);
  const v = sample(1200).psf_protocol;
  assert.equal(v.source,'device-li_mosaic_source_2026');
  assert.deepEqual(v.published_1d_profile,{
    sheet:'fig4d',measurement:'A2:B54',fit:'C2:D1001',theory:'E2:F1001',measurement_point_count:53,
    x_unit:'μm',axis_step_um:.7603125,step_calculation_origin:'atlas',figure:'4f',wavelength_nm:1200,
  });
  assert.equal(sample('main').mtf_curve.data_availability.raw_psf,null);
  assert.equal(sample('main').mtf_curve.data_availability.author_numeric_mtf,null);
  assert.equal(sample('main').mtf_curve.data_availability.independently_recomputed_mtf,null);
});

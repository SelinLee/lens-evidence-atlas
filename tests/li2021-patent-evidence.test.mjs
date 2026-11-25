import assert from 'node:assert/strict';
import test from 'node:test';
import {readFileSync} from 'node:fs';
import {load} from '../scripts/catalog.mjs';
import {validateDevices} from '../scripts/devices.mjs';
import {createWorkspace,groupRows,axisPoints,hasVisibleLight} from '../web/workspace-data.js';
const data=JSON.parse(readFileSync(new URL('../data/devices.json',import.meta.url))),domain=data.domains.metalens;
const ws=createWorkspace(load(),data),lens=ws.domains.find(d=>d.id==='metalens'),li=lens.rows.filter(r=>r.study_id==='li2021');
const added=li.filter(r=>r.id.startsWith('li2021_na03_patent_')),find=id=>added.find(r=>r.id==='li2021_na03_patent_'+id);
const a='device-li_rgb_vr_patent_a1_2021',b='device-li_rgb_vr_patent_b2_2023';

test('Li 2021 original inventor disclosure supports two additional unambiguous spectral FWHMs and explicitly retains the blue printed width',()=>{
 assert.equal(li.length,21);assert.equal(added.length,4);assert.equal(groupRows(li).length,1);
 assert.equal(groupRows(li)[0].paper,'device-li_rgb_vr_2021');
 assert.ok(added.every(r=>hasVisibleLight(lens,r)));
 assert.deepEqual(axisPoints(added,'wavelength_nm','fwhm_x_um').map(p=>[p.x,p.y]),[[548,.787],[648,.94]]);
 const blue=find('blue_470_480').values;
 assert.equal(blue.wavelength_nm.value,null);assert.deepEqual(blue.wavelength_nm.alternative_reports.map(x=>x.value),[470,480]);
 assert.equal(blue.fwhm_x_um.value,null);assert.equal(blue.fwhm_x_um.original_value,680);assert.equal(blue.fwhm_x_um.original_unit,'nm');assert.match(blue.fwhm_x_um.display,/680 nm/);
 for(const [wave,width,letter] of [[548,787,'E'],[648,940,'F']]){
  const r=find(String(wave)),v=r.values;assert.equal(r.specimen_id,'na03');assert.equal(v.diameter_um.value,2000);assert.equal(v.na.value,.3);
  assert.equal(v.fwhm_x_um.value,width/1000);assert.equal(v.fwhm_x_um.source,a);assert.equal(v.fwhm_x_um.basis,'measured');assert.match(v.fwhm_x_um.location,new RegExp('Fig.10'+letter));
  assert.equal(v.psf_protocol.focal_plane_selection,'common_plane');assert.deepEqual(v.psf_protocol.linewidth_bound_nm,{operator:'>',value:5});assert.equal(v.psf_protocol.sampling_um,null);
  assert.equal(v.measured_focal_um.value,null);assert.equal(v.focus_variation_um,undefined);assert.equal(v.efficiency_at_lambda_pct,undefined);
 }
 assert.equal(ws.sources.get(a).publication_source,'device-li_rgb_vr_2021');assert.equal(ws.sources.get(b).publication_source,'device-li_rgb_vr_2021');
 assert.equal(li.find(r=>r.id==='li2021_target_na03_target_647').values.wavelength_nm.value,647);
});

test('Li 532 nm patent MTF is an author curve with two directions and unspecified specimen identity, not a 2 mm or measured focal-shift result',()=>{
 const r=find('532_mtf'),v=r.values,m=v.mtf_curve;
 assert.equal(r.specimen_id,'na03_mtf_unconfirmed');assert.equal(v.na.value,.3);assert.equal(v.diameter_um,undefined);assert.equal(v.wavelength_nm.value,532);assert.equal(v.strehl.value,.95);assert.equal(v.strehl.basis,'derived_from_measurement');
 assert.equal(v.psf_protocol.illumination_linewidth_nm,1);assert.equal(v.psf_protocol.sampling_um,null);
 assert.equal(m.basis,'measured');assert.equal(m.frequency_unit,'lp/mm');assert.deepEqual(m.frequency_range,[0,700]);assert.deepEqual(m.directions,['tangential','sagittal']);assert.equal(m.ordinate_unit,'percent');assert.equal(m.field_point_deg,null);assert.equal(m.normalization,null);assert.equal(m.calculation_method,null);assert.equal(m.data_availability.raw_psf,null);assert.equal(m.data_availability.author_numeric_mtf,null);
 assert.equal(axisPoints(added,'wavelength_nm','measured_focal_um').length,0);assert.equal(axisPoints(added,'wavelength_nm','mtf_spatial_frequency_lpmm').length,0);
 assert.equal(validateDevices(data),true);
 for(const mutate of [x=>x.mtf_curve.frequency_unit='cycles/degree',x=>x.mtf_curve.directions=['sagittal'],x=>x.mtf_curve.data_availability.raw_psf='publication-plot.png',x=>x.mtf_curve.basis='derived_from_measurement']){
  const d=structuredClone(data);mutate(d.domains.metalens.rows.find(r=>r.id==='li2021_na03_patent_532_mtf').values);assert.throws(()=>validateDevices(d),/author directional MTF curve context/);
 }
});

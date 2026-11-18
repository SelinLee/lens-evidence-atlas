import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import test from 'node:test';
import {validateDevices} from '../scripts/devices.mjs';

const dataset = JSON.parse(readFileSync(new URL('../data/devices.json', import.meta.url)));
const {metrics,rows} = dataset.domains.metalens;
const bayati = rows.filter(row => row.study_id === 'bayati2020');
const cells = (id) => bayati.find(row => row.id === 'bayati2020_'+id).values;

test('Bayati 2020 Table 1 retains all four columns and their axis and evidence contexts', () => {
 const columns = [
  ['ordinary_simulation', [67,102,136], [12,14,18], [.95,1.1,1.2], [19.1,22.26,24.18]],
  ['ordinary_experiment', [70,102,138], [12,16,22], [.97,1.13,1.36], [18.6,21,24.65]],
  ['edof_simulation', [64.2,99.7,129.8], [17,30,44], [.96,1.3,2.25], [16.8,19.3,22.21]],
  ['edof_experiment', [70,104,134], [16,30,44], [1.07,1.7,2.32], [16.34,20.12,23.48]],
 ];
 for (const [column,focal,depth,width,efficiency] of columns) {
  const [kind,mode] = column.split('_');
  const model = mode === 'simulation';
  for (const [index,nominal] of ['66p66','100','133p33'].entries()) {
   const v = cells(kind+'_'+nominal+'_'+mode);
   const focalCell = v[model?'simulated_focal_um':'measured_focal_um'];
   const depthCell = v[model?'simulated_depth_of_focus_um':'depth_of_focus_um'];
   const widthCell = v[model?'simulated_psf_fwhm_x_um':'minimum_psf_fwhm_x_um'];
   const efficiencyCell = v[model?'simulated_focusing_efficiency_pct':'reported_axial_scan_focusing_efficiency_pct'];
   assert.deepEqual([focalCell.value,depthCell.value,widthCell.value,efficiencyCell.value],
                    [focal[index],depth[index],width[index],efficiency[index]]);
   assert.equal(v.cylindrical_aperture_width_um.value,66.66);
   assert.equal(v.diameter_um,undefined);
   assert.equal(v.wavelength_nm.value,model?null:625);
   assert.equal(v.axial_focus_offset_um,undefined);
   assert.equal(focalCell.position_definition,model?'author_reported_unspecified':'minimum_transverse_fwhm');
   for (const cell of [focalCell,depthCell]) {
    assert.equal(cell.basis,model?'model':'derived_from_measurement');
    assert.deepEqual(cell.reported_error,{type:'not_specified',value:model ? .05 : 2,sample_size:null});
    assert.match(cell.location,new RegExp('第'+(index+1)+'行'));
   }
  }
 }
});

test('crop planes, angle simulations and alternative efficiency retain separate meanings', () => {
 const profiles = bayati.filter(row => row.id.includes('_profile_'));
 assert.deepEqual(profiles.map(row => row.values.psf_protocol.evaluation_plane_um),[62,78,92,124,118,164]);
 assert.ok(profiles.every(row => !row.values.measured_focal_um && !row.values.minimum_psf_fwhm_x_um));
 const angles = bayati.filter(row => row.id.includes('_model_aoi_'));
 assert.deepEqual(angles.map(row => row.values.psf_protocol.simulated_incidence_angle_deg),[5,10,15]);
 assert.ok(angles.every(row => !row.values.aoi_deg && !row.values.depth_of_focus_um));
 const cubic = cells('si_cubic');
 const alternate = cells('si_cubic_area');
 assert.equal(cubic.simulated_focusing_efficiency_pct.value,14.47);
 assert.equal(alternate.simulated_aperture_power_ratio_pct.value,67);
 assert.equal(alternate.simulated_focusing_efficiency_pct,undefined);
 const broken = structuredClone(bayati);
 broken.find(row => row.id.endsWith('si_cubic_area')).values.efficiency_protocol.denominator = 'incident_power_on_metalens';
 assert.throws(() => validateDevices({...dataset,domains:{metalens:{metrics,rows:broken}}}),/simulated power ratio context/);
});

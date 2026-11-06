import {test} from 'node:test';import assert from 'node:assert/strict';import {load,validate,canCompare} from '../scripts/catalog.mjs';
test('catalog resolves definitions, claims and evidence',()=>{const s=validate(load());assert.equal(s.applications,33);assert.equal(s.benchmarks,55)});
test('dangling references fail',()=>{const d=load();d.metrics[0].definition_refs=['missing'];assert.throws(()=>validate(d),/missing source/)});
test('explicit priority cannot be fabricated from cited context',()=>{const d=load();const a=d.applications.find(a=>a.priorities.length);a.priorities[0].basis='author_explicit';assert.throws(()=>validate(d),/explicit source rank locator/)});
test('global best without a scoped comparison is rejected',()=>{const d=load();d.bests[0].claim_type='world_record';assert.throws(()=>validate(d),/world record forbidden/)});
test('missing and mismatched conditions block numeric comparisons',()=>{assert.equal(canCompare({nm:532},{nm:633},['nm']),false);assert.equal(canCompare({nm:532},{nm:532},['nm','denominator']),false);assert.equal(canCompare({nm:532,denominator:'incident'},{nm:532,denominator:'incident'},['nm','denominator']),true)});

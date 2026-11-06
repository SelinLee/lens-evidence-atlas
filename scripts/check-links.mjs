import {load} from './catalog.mjs';
// Optional audit only: publisher 403/429 does not make a scientific claim false.
const results=[];for(const s of load().sources){try{const r=await fetch(s.url,{method:'HEAD',signal:AbortSignal.timeout(10000)});results.push({id:s.id,status:r.status,checked_at:new Date().toISOString()})}catch(e){results.push({id:s.id,status:'unreachable',error:e.message})}}console.log(JSON.stringify(results,null,2));

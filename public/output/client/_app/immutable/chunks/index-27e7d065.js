function l(){}function b(e,s){return e!=e?s==s:e!==s||e&&typeof e=="object"||typeof e=="function"}Promise.resolve();var u=[];function w(e,s){return{subscribe:p(e,s).subscribe}}function p(e,s=l){let f;const o=new Set;function r(t){if(b(e,t)&&(e=t,f)){const c=!u.length;for(const n of o)n[1](),u.push(n,e);if(c){for(let n=0;n<u.length;n+=2)u[n][0](u[n+1]);u.length=0}}}function a(t){r(t(e))}function i(t,c=l){const n=[t,c];return o.add(n),o.size===1&&(f=s(r)||l),t(e),()=>{o.delete(n),o.size===0&&(f(),f=null)}}return{set:r,update:a,subscribe:i}}var v="https://api.lanyard.rest/v1",y="wss://api.lanyard.rest/socket",E=3e4;function h(e,s){if(!e)throw new Error("A Discord user ID must be specified");return w(void 0,o=>{if(s&&s.type==="rest"){let r=function(){fetch(`${v}/users/${e}`).then(i=>{i.json().then(t=>{var c;if(!t.success)throw new Error(((c=t.error)==null?void 0:c.message)||"An unknown error occurred");o(t.data)})})};if(!("fetch"in window))throw new Error("svelte-lanyard only works clientside");r();const a=setInterval(()=>{r()},s.restInterval);return function(){clearInterval(a)}}else{if(!("WebSocket"in window||"MozWebSocket"in window))throw new Error("svelte-lanyard only works clientside");const r=new WebSocket(y);let a;return r.addEventListener("open",()=>{r.send(JSON.stringify({op:2,d:{subscribe_to_id:e}})),a=setInterval(()=>{r.send(JSON.stringify({op:3}))},E)}),r.addEventListener("message",({data:i})=>{const{op:t,seq:c,t:n,d}=JSON.parse(i);(n==="INIT_STATE"||n==="PRESENCE_UPDATE")&&o(d)}),function(){r.close(),clearInterval(a)}}})}export{h as useLanyard};
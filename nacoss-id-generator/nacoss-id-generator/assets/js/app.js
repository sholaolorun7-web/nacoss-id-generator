(function(){
'use strict';
const DB_KEY='nacossApplications', ADMIN_KEY='nacossAdminSession';
const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>[...r.querySelectorAll(s)];
function readApps(){try{const v=JSON.parse(localStorage.getItem(DB_KEY)||'[]');return Array.isArray(v)?v:[]}catch(e){console.warn('Application storage could not be read.',e);return[]}}
function saveApps(apps){try{localStorage.setItem(DB_KEY,JSON.stringify(apps));return true}catch(e){alert('Unable to save. Browser storage may be full. Try a smaller photograph.');return false}}
function makeId(prefix='NAC'){return prefix+'-'+Date.now().toString(36).toUpperCase()+'-'+Math.random().toString(36).slice(2,7).toUpperCase()}
function escapeHTML(v=''){return String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function fmtDate(v){if(!v)return '—';const d=new Date(v);return isNaN(d)?'—':d.toLocaleDateString(undefined,{day:'numeric',month:'short',year:'numeric'})}
function statusBadge(s){return `<span class="status ${escapeHTML((s||'pending').toLowerCase())}">${escapeHTML(s||'Pending')}</span>`}
function toast(message,type='success',target='#page-message'){const el=$(target);if(!el){alert(message);return}el.className='notice '+type;el.textContent=message;el.classList.remove('hidden');}
function byId(id){return readApps().find(a=>a.applicationId===id||a.matricNo.toLowerCase()===String(id||'').trim().toLowerCase())}
function updateApp(id,changes){const apps=readApps(),i=apps.findIndex(a=>a.applicationId===id);if(i<0)return false;apps[i]={...apps[i],...changes,updatedAt:new Date().toISOString()};return saveApps(apps)}
function nav(){const b=$('.menu-toggle'),n=$('.nav-links');if(b&&n)b.addEventListener('click',()=>n.classList.toggle('open'))}
function seedDemo(){let apps=readApps();if(apps.some(a=>a.demo))return false;const now=Date.now();const samples=[{name:'Adaobi Okafor',matricNo:'NAC/DEMO/001',institution:'Federal Polytechnic',department:'Computer Science',programme:'ND Computer Science',level:'ND2',session:'2025/2026',email:'adaobi.demo@example.com',phone:'08000000001',bloodGroup:'',emergencyContact:'',photo:'assets/images/default-avatar.svg',status:'Pending'},{name:'Daniel Musa',matricNo:'NAC/DEMO/002',institution:'Federal Polytechnic',department:'Computer Science',programme:'HND Computer Science',level:'HND1',session:'2025/2026',email:'daniel.demo@example.com',phone:'08000000002',bloodGroup:'',emergencyContact:'',photo:'assets/images/default-avatar.svg',status:'Approved'},{name:'Mary James',matricNo:'NAC/DEMO/003',institution:'Federal Polytechnic',department:'Information Technology',programme:'ND Information Technology',level:'ND1',session:'2025/2026',email:'mary.demo@example.com',phone:'08000000003',bloodGroup:'',emergencyContact:'',photo:'assets/images/default-avatar.svg',status:'Rejected',rejectionReason:'Please upload a clearer student photograph.'}];samples.forEach((s,i)=>apps.push({...s,applicationId:'NAC-DEMO-'+String(i+1).padStart(4,'0'),cardNumber:i===1?'NAC-CARD-DEMO-0002':'',submittedAt:new Date(now-(i+1)*86400000).toISOString(),approvedAt:i===1?new Date().toISOString():'',demo:true}));return saveApps(apps)}
window.NACOSS={readApps,saveApps,makeId,escapeHTML,fmtDate,statusBadge,toast,byId,updateApp,seedDemo,DB_KEY,ADMIN_KEY};
document.addEventListener('DOMContentLoaded',nav);
})();

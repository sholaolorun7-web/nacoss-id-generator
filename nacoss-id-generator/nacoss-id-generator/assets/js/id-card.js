document.addEventListener('DOMContentLoaded',()=>{
const card=document.querySelector('#print-card');if(!card)return;const id=new URLSearchParams(location.search).get('id');const a=NACOSS.byId(id);const message=document.querySelector('#card-message');
if(!a||a.status!=='Approved'){message.classList.remove('hidden');message.className='notice warning';message.textContent='This ID card is unavailable. Only approved applications can generate a card.';document.querySelector('#card-actions').classList.add('hidden');return}
const set=(s,v)=>{const el=card.querySelector(s);if(el)el.textContent=v||'—'};
card.querySelector('#card-photo').src=a.photo||'assets/images/default-avatar.svg';set('#card-name',a.name);set('#card-matric',a.matricNo);set('#card-dept',a.department);set('#card-programme',a.programme);set('#card-level',a.level);set('#card-session',a.session);set('#card-number',a.cardNumber||'NAC-CARD');set('#card-issue',NACOSS.fmtDate(a.approvedAt||new Date()));set('#card-valid',String((new Date().getFullYear()+1))+'/ '+(new Date().getFullYear()+2));
const qrText=location.origin+location.pathname.replace(/id-card\.html$/,'verify.html')+'?id='+encodeURIComponent(a.applicationId);
const qr=document.querySelector('#qrcode');if(window.QRCode){new QRCode(qr,{text:qrText,width:110,height:110,colorDark:'#102b55',colorLight:'#ffffff',correctLevel:QRCode.CorrectLevel.M})}else{qr.innerHTML='<small>QR library unavailable. Use the verification reference below.</small>';document.querySelector('#qr-ref').textContent=a.applicationId}
document.querySelector('#print-button').addEventListener('click',()=>window.print());
document.querySelector('#back-button').addEventListener('click',()=>location.href='track.html?matric='+encodeURIComponent(a.matricNo));
});

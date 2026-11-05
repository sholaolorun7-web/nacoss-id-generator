document.addEventListener('DOMContentLoaded',()=>{
const form=document.querySelector('#registration-form');if(!form)return;
const file=document.querySelector('#photo'),preview=document.querySelector('#photo-preview');let photoData='';
file.addEventListener('change',()=>{const f=file.files[0];photoData='';preview.style.display='none';if(!f)return;if(!f.type.startsWith('image/')){file.value='';NACOSS.toast('Please select an image file.','error');return}if(f.size>1.5*1024*1024){file.value='';NACOSS.toast('Photo must be 1.5 MB or smaller.','error');return}const reader=new FileReader();reader.onload=()=>{photoData=reader.result;preview.src=photoData;preview.style.display='block'};reader.readAsDataURL(f)});
form.addEventListener('submit',e=>{e.preventDefault();const data=Object.fromEntries(new FormData(form).entries());let valid=true;form.querySelectorAll('[required]').forEach(el=>{const err=el.parentElement.querySelector('.error');if(!el.value.trim()){valid=false;if(err)err.textContent='This field is required.'}else if(err)err.textContent=''});const email=form.email.value.trim();if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){valid=false;form.email.parentElement.querySelector('.error').textContent='Enter a valid email address.'}if(!photoData){valid=false;NACOSS.toast('Please upload a student photograph.','error')}if(!valid)return;
const apps=NACOSS.readApps();if(apps.some(a=>a.matricNo.toLowerCase()===data.matricNo.trim().toLowerCase())){NACOSS.toast('An application already exists for this matriculation number. Track the existing application instead.','error');return}
const app={...data,name:data.name.trim(),matricNo:data.matricNo.trim(),applicationId:NACOSS.makeId('NAC-APP'),cardNumber:'',photo:photoData,status:'Pending',rejectionReason:'',submittedAt:new Date().toISOString(),approvedAt:'',demo:false};
if(!NACOSS.saveApps([...apps,app]))return;
form.reset();preview.style.display='none';photoData='';document.querySelector('#success-id').textContent=app.applicationId;document.querySelector('#success-panel').classList.remove('hidden');form.classList.add('hidden');window.scrollTo({top:0,behavior:'smooth'});
});
});

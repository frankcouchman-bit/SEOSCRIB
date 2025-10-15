import { useEffect, useState } from 'preact/hooks';

type Props = {
  email?: string|null;
  openAuth: () => void;
};

export default function ExitIntentModal({ email, openAuth }: Props){
  const [open, setOpen] = useState(false);
  useEffect(()=>{
    if(email) return;
    const onOut = (e: MouseEvent)=>{
      if(!open && e.clientY <= 0) setOpen(true);
    };
    const idleTimer = setTimeout(()=>{ if(!email) setOpen(true); }, 90000);
    document.addEventListener('mouseout', onOut);
    return ()=>{ document.removeEventListener('mouseout', onOut); clearTimeout(idleTimer); };
  },[email, open]);

  if(!open || email) return null;
  return (
    <div style="position:fixed;inset:0;z-index:9998">
      <div style="position:fixed;inset:0;background:rgba(0,0,0,.8);backdrop-filter:blur(10px)" onClick={()=>setOpen(false)}></div>
      <div style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:90%;max-width:560px">
        <div class="glass-strong p-6 md:p-8 rounded-2xl relative">
          <button onClick={()=>setOpen(false)} class="absolute top-2 right-2 text-white/70">✖</button>
          <div class="text-center mb-2">
            <div class="w-16 h-16 rounded-xl mx-auto mb-3 flex items-center justify-center" style="background:linear-gradient(135deg,#667eea,#764ba2)">🌟</div>
            <h2 class="text-2xl font-black">Save your article & get 1/day free</h2>
            <p class="text-white/70">Create a free account to save, export, and unlock your library.</p>
          </div>
          <div class="mt-5 flex gap-3 justify-center">
            <button onClick={openAuth} class="btn-primary px-6 py-3">Create Free Account</button>
            <button onClick={()=>setOpen(false)} class="btn-secondary px-6 py-3">Maybe later</button>
          </div>
        </div>
      </div>
    </div>
  );
}

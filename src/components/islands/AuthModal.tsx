import { useEffect, useState } from 'preact/hooks';
import { googleAuthRedirect, requestMagic } from '../../lib/api';

type Props = {
  open: boolean;
  onClose: ()=>void;
};

export default function AuthModal({ open, onClose }: Props){
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  useEffect(()=>{
    if(!open) setSent(false);
  },[open]);

  if(!open) return null;
  return (
    <div style="position:fixed;inset:0;z-index:9999">
      <div style="position:fixed;inset:0;background:rgba(0,0,0,.8);backdrop-filter:blur(10px)" onClick={onClose}></div>
      <div style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:90%;max-width:520px">
        <div class="glass-strong p-6 md:p-8 rounded-2xl relative">
          <button onClick={onClose} class="absolute top-2 right-2 text-white/70">✖</button>
          <div class="text-center mb-4">
            <div class="w-16 h-16 rounded-xl mx-auto mb-3 flex items-center justify-center" style="background:linear-gradient(135deg,#667eea,#764ba2)">⭐</div>
            <h2 class="text-xl font-black">Create Your Library</h2>
            <p class="text-white/70">Save and manage your articles</p>
          </div>
          <button onClick={googleAuthRedirect} class="btn-primary w-full justify-center mb-3">Continue with Google</button>
          <div class="text-center text-white/60 my-2 text-sm">or</div>
          <form onSubmit={async(e)=>{ e.preventDefault(); await requestMagic(email); setSent(true); }}>
            <input type="email" required value={email} onInput={(e:any)=>setEmail(e.currentTarget.value)} placeholder="your@email.com" class="input-field mb-2"/>
            <button class="btn-secondary w-full">Send Magic Link →</button>
            <p class="text-center text-white/60 text-xs mt-2">{sent ? '✅ Magic link sent.' : 'We’ll email a secure sign-in link'}</p>
          </form>
        </div>
      </div>
    </div>
  );
}

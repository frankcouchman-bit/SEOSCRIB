type Props = {
  email?: string|null;
  plan: 'free'|'pro';
  onOpenAuth: ()=>void;
  onUpgrade: ()=>void;
  onSignOut: ()=>void;
};

export default function Header({ email, plan, onOpenAuth, onUpgrade, onSignOut }: Props){
  return (
    <div class="glass-strong border-b border-white/10">
      <div class="max-w-[1280px] mx-auto px-6 py-4 flex justify-between items-center">
        <a href="/" class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-xl flex items-center justify-center" style="background:linear-gradient(135deg,#667eea,#764ba2);box-shadow:0 5px 15px rgba(102,126,234,.3)">✨</div>
          <div>
            <div class="text-2xl font-black tracking-tight">SEOScribe</div>
            <div class="text-xs font-extrabold text-indigo-400">AI Article Writer</div>
          </div>
        </a>

        {email ? (
          <div class="flex items-center gap-3 flex-wrap">
            <a href="/tools" class="text-white/70 hover:text-white font-semibold">Tools</a>
            <span class="text-sm text-white/70 font-semibold">{email} • <span class="text-indigo-300 font-extrabold uppercase">{plan}</span></span>
            {plan === 'pro' ? (
              <a href="#" class="btn-secondary text-sm px-3 py-2">Billing</a>
            ) : (
              <button onClick={onUpgrade} class="btn-primary text-sm px-3 py-2">Upgrade</button>
            )}
            <button onClick={onSignOut} class="btn-secondary text-sm px-3 py-2">Sign out</button>
          </div>
        ) : (
          <div class="flex gap-4 items-center">
            <a href="#intents" class="text-white/70 hover:text-white font-semibold">Use Cases</a>
            <a href="#pricing" class="text-white/70 hover:text-white font-semibold">Pricing</a>
            <a href="#faq" class="text-white/70 hover:text-white font-semibold">FAQ</a>
            <button onClick={onOpenAuth} class="btn-primary text-sm px-4 py-2">Start Free</button>
          </div>
        )}
      </div>
    </div>
  );
}

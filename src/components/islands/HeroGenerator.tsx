import { useEffect, useMemo, useState } from 'preact/hooks';
import { draftArticle, getProfile, createCheckout } from '../../lib/api';
import { ARTICLE_KEY, incCount, leftToday } from '../../lib/limits';

type Profile = {
  plan?: 'free'|'pro';
  usage?: { today?: { generations?: number }, month?: { generations?: number } };
  email?: string;
  tool_limit_daily?: number;
};

export default function HeroGenerator(){
  const [topic, setTopic] = useState('');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const [profile, setProfile] = useState<Profile|null>(null);
  const email = profile?.email || null;
  const plan = (profile?.plan || 'free') as 'free'|'pro';
  const usedTodayServer = profile?.usage?.today?.generations || 0;
  const articleLimit = plan === 'pro' ? 15 : 1;
  const usedTodayClient = usedTodayServer; // trust server when signed in
  const usedToday = usedTodayClient;

  const locked = usedToday >= articleLimit || leftToday(ARTICLE_KEY, articleLimit, email) <= 0;

  useEffect(()=>{
    (async ()=>{
      const p = await getProfile();
      if(p && p.email){ setProfile({ plan: p.plan || 'free', usage:p.usage||{}, email:p.email, tool_limit_daily: p.tool_limit_daily }); }
      // Parse OAuth callback parameters if present
      const query = new URLSearchParams(location.search);
      const hash = new URLSearchParams((location.hash || '').replace(/^#/,''));
      const get = (k:string)=> query.get(k) || hash.get(k);
      const access = get('access_token'); const refresh = get('refresh_token');
      const upgrade = get('upgrade');
      if(access){ localStorage.setItem('authToken', access); }
      if(refresh){ localStorage.setItem('refreshToken', refresh); }
      if(access || refresh){
        history.replaceState({},'',location.origin + location.pathname);
        const fresh = await getProfile();
        if(fresh && fresh.email){ setProfile({ plan:fresh.plan||'free', usage:fresh.usage||{}, email:fresh.email, tool_limit_daily:fresh.tool_limit_daily }); }
      }
      if(upgrade){ history.replaceState({},'',location.origin + location.pathname); }
    })();
  },[]);

  async function generate(){
    if(!topic.trim()) { alert('Please enter a topic'); return; }
    if(locked){ alert('Daily free limit reached. Reset at midnight.'); return; }
    setLoading(true);
    try{
      const target = plan === 'pro' ? 5500 : 3000;
      const out = await draftArticle({
        topic: topic.trim(),
        website_url: url.trim() || undefined,
        tone: 'professional',
        target_word_count: target,
        generate_social: true
      });
      // Count locally to enforce UI lock until next refresh
      incCount(ARTICLE_KEY, email);
      localStorage.setItem('lastArticle', JSON.stringify(out));
      window.location.href = '/article';
    } catch(e:any){
      alert(e?.message || 'Generation failed');
    }
    setLoading(false);
  }

  return (
    <div class="glass-strong gb max-w-xl p-6 rounded-2xl shadow-2xl">
      <div class="mb-4">
        <div class="badge inline-flex items-center gap-2 px-3 py-1 rounded-full" style="background:rgba(102,126,234,.15);border:1px solid rgba(102,126,234,.3);font-weight:800">🎁 Free AI Writer — No Card</div>
      </div>
      <input
        class="input-field mb-3 text-[1.05rem]"
        placeholder="Enter a topic (e.g., Best Project Management Tools 2026)"
        value={topic}
        onInput={(e:any)=>setTopic(e.currentTarget.value)}
        disabled={loading}
      />
      <input
        class="input-field mb-3"
        placeholder="Your website URL (optional, for internal links)"
        value={url}
        onInput={(e:any)=>setUrl(e.currentTarget.value)}
        disabled={loading}
      />
      <button class="btn-primary w-full justify-center py-4" disabled={loading || locked} onClick={generate}>
        {loading ? 'Generating…' : 'Generate Free Article'}
      </button>
      {locked ? (
        <p class="text-white/60 text-sm text-center mt-3">
          Daily free limit reached — try again after midnight or upgrade to Pro.
        </p>
      ) : (
        <p class="text-white/60 text-sm text-center mt-3">
          Free: 1/day. Pro: 15/day, unlimited library & export.
        </p>
      )}

      <div class="mt-4">
        {plan === 'pro' ? (
          <button class="btn-secondary w-full justify-center" onClick={()=>window.location.href='/tools'}>Explore SEO Tools</button>
        ) : (
          <button class="btn-secondary w-full justify-center" onClick={async()=>{ try{ await createCheckout(); }catch{ alert('Checkout failed'); } }}>
            Upgrade to Pro →
          </button>
        )}
      </div>
    </div>
  );
}

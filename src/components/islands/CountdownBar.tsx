import { useEffect, useState } from 'preact/hooks';
import { formattedHMS, msUntilMidnight } from '../../lib/limits';

type Props = {
  email?: string|null;
  plan: 'free' | 'pro';
  articlesUsed: number;
  articleLimit: number;
  onOpenAuth: () => void;
};

export default function CountdownBar({ email, plan, articlesUsed, articleLimit, onOpenAuth }: Props){
  const [left, setLeft] = useState(msUntilMidnight());
  useEffect(()=>{
    const t = setInterval(()=>setLeft(msUntilMidnight()), 1000);
    return ()=>clearInterval(t);
  },[]);
  return (
    <div class="w-full bg-white/5 border-b border-white/10">
      <div class="max-w-[1280px] mx-auto px-6 py-2 flex items-center justify-between text-sm">
        <div class="flex items-center gap-2">
          <span>⏱️ Daily reset in <b>{formattedHMS(left)}</b></span>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-white/80">Articles today: <b>{articlesUsed}</b> / {articleLimit}</span>
          {!email && <button class="btn-primary text-xs px-3 py-2" onClick={onOpenAuth}>Start Free</button>}
        </div>
      </div>
    </div>
  );
}

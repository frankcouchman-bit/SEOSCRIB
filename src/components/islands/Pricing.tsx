export default function Pricing(){
  return (
    <section id="pricing" class="py-14">
      <div class="max-w-[1200px] mx-auto px-6">
        <div class="text-center mb-8">
          <h2 class="text-3xl md:text-4xl font-black mb-2">Start Free, Upgrade When You’re Ready</h2>
          <p class="muted">Try our free AI writer — no credit card. Pro unlocks 15 articles/day, unlimited library & export, and analytics.</p>
        </div>
        <div class="grid md:grid-cols-2 gap-6 max-w-[900px] mx-auto">
          <div class="glass p-8 rounded-2xl">
            <div class="inline-block mb-4 px-3 py-1 rounded-full text-emerald-400" style="background:rgba(16,185,129,.15); border:1px solid rgba(16,185,129,.3); font-weight:800">FREE FOREVER</div>
            <h3 class="text-xl font-extrabold mb-2">Free Article Writer</h3>
            <div class="text-5xl font-black mb-1">$0</div>
            <div class="text-white/60 mb-4">Perfect for trying out</div>
            <ul class="space-y-2 mb-5">
              {[
                '1 article per day',
                '1 demo article per IP',
                '2–6k words each',
                'Citations & hero image',
                'A/B titles & social pack (view)',
                'Save & Export'
              ].map(f=> <li class="flex gap-2 items-center">✅ <span>{f}</span></li>)}
            </ul>
            <a href="#hero" class="btn-secondary w-full inline-flex justify-center">Start Writing Free</a>
          </div>

          <div class="glass p-8 rounded-2xl border-2 border-indigo-400 relative shadow-[0_20px_60px_rgba(102,126,234,.3)]">
            <div class="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-sm font-bold" style="background:linear-gradient(135deg,#667eea,#764ba2)">MOST POPULAR</div>
            <h3 class="text-xl font-extrabold mb-2 mt-2">Pro Article Writer</h3>
            <div class="text-5xl font-black mb-1"><span style="background:linear-gradient(135deg,#7a5af8,#d66efd);-webkit-background-clip:text;-webkit-text-fill-color:transparent">$24</span><span class="text-xl text-white/60">/month</span></div>
            <div class="text-white/70 mb-4">For serious teams</div>
            <ul class="space-y-2 mb-5">
              {[
                '15 articles per day',
                'Unlimited library & export',
                'Priority queue',
                'Inline editor & rewrites',
                'Keyword clusters & FAQs',
                'Analytics dashboard',
                'Priority support',
              ].map(f=> <li class="flex gap-2 items-center">⚡ <span>{f}</span></li>)}
            </ul>
            <a href="/#hero" class="btn-primary w-full inline-flex justify-center">Upgrade to Pro →</a>
            <div class="text-center text-white/60 text-sm mt-2">Cancel anytime</div>
          </div>
        </div>
      </div>
    </section>
  );
}

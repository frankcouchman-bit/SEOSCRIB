export default function FAQ(){
  const faqs: [string,string][] = [
    ['Is SEOScribe really a free AI writer?', 'Yes. You can generate one full article per day (2–6k words) and one demo article per IP per month without signing in. Pro unlocks 15/day, export, library and analytics.'],
    ['What makes this AI writing tool better for SEO?', 'We generate long-form drafts with citations, clean H2/H3 structure, meta, hero images, A/B titles, keyword ideas, FAQs and social posts.'],
    ['Can the article writer handle long-form content?', 'Yes. Our writer targets 2–6k words with readable sections and internal link suggestions.'],
    ['Will my content rank on Google?', 'We structure for SEO and provide depth, keywords, citations, hero images and FAQs. Ranking also depends on your domain and competition.'],
    ['Is there a tool for headlines, meta and briefs?', 'Yes—headline analyzer, readability, SERP preview, plagiarism estimation, keyword clustering and content briefs. Free: 1 use/tool/day; Pro: 10.'],
    ['Can I export to my CMS?', 'Export Markdown and paste into most modern CMSs.'],
  ];
  return (
    <section id="faq" class="py-16">
      <div class="max-w-[1200px] mx-auto px-6">
        <h2 class="text-3xl md:text-4xl font-black mb-6">FAQ</h2>
        <div class="space-y-3">
          {faqs.map(([q,a])=>(
            <details class="faq glass p-4 rounded-xl">
              <summary class="flex items-center justify-between font-extrabold cursor-pointer">
                <span>{q}</span><span>▼</span>
              </summary>
              <div class="text-white/80 mt-2">{a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

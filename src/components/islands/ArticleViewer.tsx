import { useEffect, useState } from 'preact/hooks';

type Article = {
  title?: string;
  meta?: { description?: string };
  image?: { image_url?: string; image_b64?: string; media_type?: string };
  word_count?: number;
  reading_time_minutes?: number;
  sections?: { heading: string; paragraphs: string[] }[];
  faqs?: { q: string; a: string }[];
  citations?: { title: string; url: string }[];
};

export default function ArticleViewer(){
  const [article, setArticle] = useState<Article|null>(null);

  useEffect(()=>{
    const raw = localStorage.getItem('lastArticle');
    if(raw){
      try{ setArticle(JSON.parse(raw)); }catch{}
    }
  },[]);

  if(!article) return (
    <div class="max-w-[1000px] mx-auto p-6">
      <div class="glass p-6 rounded-2xl">No article loaded. Go back to the <a class="underline" href="/">generator</a>.</div>
    </div>
  );

  const imgSrc = article.image?.image_url
    || (article.image?.image_b64 ? `data:${article.image.media_type || 'image/png'};base64,${article.image.image_b64}` : '');

  return (
    <div class="max-w-[1000px] mx-auto p-4">
      <div class="flex justify-between items-center gap-2 flex-wrap mb-3">
        <a href="/" class="btn-secondary">← Back</a>
        <div class="flex gap-2 flex-wrap">
          <button class="btn-secondary" onClick={()=>{
            const md = toMarkdown(article);
            navigator.clipboard.writeText(md);
            alert('Copied as Markdown');
          }}>Copy</button>
          <button class="btn-secondary" onClick={()=>{
            const md = toMarkdown(article);
            const blob = new Blob([md], { type:'text/markdown' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href=url; a.download='article.md'; a.click();
            URL.revokeObjectURL(url);
          }}>Export</button>
        </div>
      </div>

      <div class="glass-strong gb rounded-2xl p-6 md:p-8">
        {imgSrc && (
          <img src={imgSrc} alt="Article hero" class="w-full rounded-xl mb-4" style="max-height:420px;object-fit:cover"/>
        )}
        <h1 class="text-3xl md:text-4xl font-black">{article.title || 'Untitled'}</h1>
        {article.meta?.description && <p class="text-white/80 mt-2">{article.meta.description}</p>}
        <div class="flex gap-2 mt-3 flex-wrap">
          <span class="pill">📊 {article.word_count || 0} words</span>
          <span class="pill">⏱️ {article.reading_time_minutes || 0} min read</span>
          <span class="pill">🔗 {(article.citations||[]).length} sources</span>
        </div>

        {(article.sections||[]).map((s)=>(
          <div class="mt-6">
            <h2 class="text-2xl font-extrabold text-indigo-200">{s.heading}</h2>
            {s.paragraphs.map(p=> <p class="muted mt-2 leading-7">{p}</p>)}
          </div>
        ))}

        {(article.faqs||[]).length>0 && (
          <div class="mt-8 pt-4 border-t border-white/10">
            <h3 class="text-xl font-black mb-2">FAQs</h3>
            {(article.faqs||[]).map(f=>(
              <div class="mb-3">
                <div class="font-extrabold">{f.q}</div>
                <div class="muted">{f.a}</div>
              </div>
            ))}
          </div>
        )}

        {(article.citations||[]).length>0 && (
          <div class="mt-8 pt-4 border-t border-white/10">
            <h3 class="text-xl font-black mb-2">Sources & Citations</h3>
            {(article.citations||[]).map((c,i)=>(
              <div class="glass p-3 rounded-lg my-2 flex gap-2 items-start">
                <span class="text-indigo-300 font-black">[{i+1}]</span>
                <a class="text-indigo-200 underline" href={c.url} target="_blank" rel="noopener">{c.title}</a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function toMarkdown(a: Article){
  let md = `# ${a.title || 'Untitled'}\n\n`;
  if(a.meta?.description) md += `> ${a.meta.description}\n\n`;
  (a.sections||[]).forEach((s)=>{
    md += `## ${s.heading}\n\n`;
    s.paragraphs.forEach(p=>{ md += `${p}\n\n`; });
  });
  if((a.faqs||[]).length){
    md += `\n## FAQs\n\n`;
    a.faqs!.forEach(f=>{ md += `**${f.q}**\n\n${f.a}\n\n`; });
  }
  return md;
}

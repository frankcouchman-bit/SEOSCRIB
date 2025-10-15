type Props = { onClick: () => void };

export default function StickyCTA({ onClick }: Props){
  return (
    <div class="fixed bottom-4 right-4 z-[70]">
      <div class="glass-strong gb rounded-2xl p-3 shadow-2xl flex items-center gap-3">
        <span>✨ Generate long-form articles with images & citations.</span>
        <button onClick={onClick} class="btn-primary text-sm px-3 py-2">Try Free</button>
      </div>
    </div>
  );
}

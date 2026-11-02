export default function Home() {
  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-12">
      <h1 className="font-display text-display-xl uppercase">Design check</h1>
      <p className="text-body-lg text-fg-secondary">Body text in Inter. Price: <span className="text-price tabular-nums">₱1,234.00</span></p>
      <div className="flex flex-wrap gap-3">
        <span className="rounded-full bg-accent px-4 py-2 text-button uppercase text-on-accent">Accent</span>
        <span className="rounded-full bg-char px-4 py-2 text-button uppercase text-on-char">Char</span>
        <span className="rounded-full bg-accent-tint px-4 py-2 text-label text-accent-ink">Tint + ink</span>
      </div>
    </div>
  );
}
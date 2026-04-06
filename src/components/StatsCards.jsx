const cards = [
  { key: "total", label: "Total tasks", tone: "bg-slate-900 text-white" },
  { key: "active", label: "Active now", tone: "bg-white text-slate-900" },
  { key: "completed", label: "Completed", tone: "bg-blue-50 text-blue-900" },
  { key: "dueToday", label: "Due today", tone: "bg-amber-50 text-amber-900" },
];

const StatsCards = ({ stats }) => (
  <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
    {cards.map((card) => (
      <article
        key={card.key}
        className={`glass-panel rounded-[24px] p-5 ${card.tone}`}
      >
        <p className="text-sm font-medium opacity-75">{card.label}</p>
        <div className="mt-6 flex items-end justify-between gap-3">
          <span className="font-display text-4xl font-bold">
            {stats[card.key]}
          </span>
          <span className="rounded-full border border-current/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] opacity-70">
            Live
          </span>
        </div>
      </article>
    ))}
  </section>
);

export default StatsCards;

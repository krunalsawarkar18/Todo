const FILTERS = [
  { id: "all", label: "All tasks" },
  { id: "active", label: "Active" },
  { id: "completed", label: "Completed" },
  { id: "high-priority", label: "High priority" },
  { id: "due-today", label: "Due today" },
  { id: "overdue", label: "Overdue" },
];

const SidebarFilters = ({
  activeFilter,
  onFilterChange,
  taskCounts,
  completedCount,
  onClearCompleted,
  mobile,
  onClose,
}) => {
  const panelClass = mobile
    ? "glass-panel fixed inset-y-0 left-0 z-40 w-[min(20rem,88vw)] rounded-r-[28px] p-5"
    : "glass-panel sticky top-6 rounded-[28px] p-5";

  return (
    <aside className={panelClass}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
            Focus modes
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold text-slate-900">
            Filters
          </h2>
        </div>
        {mobile ? (
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600"
          >
            Close
          </button>
        ) : null}
      </div>

      <div className="mt-6 space-y-2">
        {FILTERS.map((filter) => {
          const isActive = filter.id === activeFilter;
          const count = taskCounts[filter.id] ?? 0;

          return (
            <button
              key={filter.id}
              type="button"
              onClick={() => {
                onFilterChange(filter.id);
                onClose?.();
              }}
              className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${
                isActive
                  ? "bg-slate-900 text-white"
                  : "bg-white/70 text-slate-700 hover:bg-white"
              }`}
            >
              <span>{filter.label}</span>
              <span
                className={`rounded-full px-2.5 py-1 text-xs ${
                  isActive ? "bg-white/15 text-white" : "bg-slate-100 text-slate-500"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-8 rounded-[24px] bg-slate-950 p-5 text-white">
        <p className="text-sm font-semibold text-white/70">Maintenance</p>
        <p className="mt-2 text-sm leading-6 text-white/80">
          Keep the list light by removing tasks you already finished.
        </p>
        <button
          type="button"
          onClick={onClearCompleted}
          disabled={!completedCount}
          className="mt-5 w-full rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-45"
        >
          Clear completed ({completedCount})
        </button>
      </div>
    </aside>
  );
};

export default SidebarFilters;

const DashboardHeader = ({
  search,
  onSearchChange,
  onOpenFilters,
  onOpenTaskForm,
  taskCount,
}) => (
  <header className="glass-panel rounded-[28px] p-5 sm:p-6">
    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
          Local-first planner
        </p>
        <div className="space-y-2">
          <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Momentum Todo
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            Keep today clear with a focused dashboard for priorities, due dates,
            and quick task capture.
          </p>
        </div>
      </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative">
            <input
              type="search"
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder={`Search ${taskCount} task${taskCount === 1 ? "" : "s"}`}
              className="w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 pl-11 text-sm text-slate-700 outline-none transition focus:border-blue-400 sm:w-72"
            />
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
          </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onOpenFilters}
            className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 lg:hidden"
          >
            Filters
          </button>
          <button
            type="button"
            onClick={onOpenTaskForm}
            className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:bg-slate-800"
          >
            New task
          </button>
        </div>
      </div>
    </div>
  </header>
);

export default DashboardHeader;

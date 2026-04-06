const priorityClasses = {
  low: "bg-emerald-50 text-emerald-700",
  medium: "bg-amber-50 text-amber-700",
  high: "bg-rose-50 text-rose-700",
};

const formatDueDate = (dueDate) => {
  if (!dueDate) {
    return "No deadline";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(`${dueDate}T00:00:00`));
};

const TaskItem = ({ task, onToggleStatus, onEdit, onDelete, dueState }) => (
  <article className="glass-panel rounded-[28px] p-5 transition hover:-translate-y-0.5">
    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => onToggleStatus(task)}
          className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition ${
            task.status === "completed"
              ? "border-emerald-500 bg-emerald-500 text-white"
              : "border-slate-300 bg-white text-transparent hover:border-slate-400"
          }`}
          aria-label={
            task.status === "completed" ? "Mark as active" : "Mark as completed"
          }
        >
          ✓
        </button>

        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <h3
              className={`text-lg font-bold text-slate-900 ${
                task.status === "completed" ? "line-through opacity-55" : ""
              }`}
            >
              {task.title}
            </h3>
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${priorityClasses[task.priority]}`}
            >
              {task.priority}
            </span>
            {dueState ? (
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${
                  dueState === "overdue"
                    ? "bg-rose-100 text-rose-700"
                    : "bg-amber-100 text-amber-800"
                }`}
              >
                {dueState}
              </span>
            ) : null}
          </div>

          {task.description ? (
            <p className="max-w-3xl text-sm leading-6 text-slate-600">
              {task.description}
            </p>
          ) : (
            <p className="text-sm italic text-slate-400">
              No description added yet.
            </p>
          )}

          <div className="flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            <span>Due {formatDueDate(task.dueDate)}</span>
            <span>{task.status === "completed" ? "Completed" : "In progress"}</span>
          </div>
        </div>
      </div>

      <div className="flex shrink-0 gap-3 lg:pl-4">
        <button
          type="button"
          onClick={() => onToggleStatus(task)}
          className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${
            task.status === "completed"
              ? "border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
              : "bg-slate-900 text-white hover:bg-slate-800"
          }`}
        >
          {task.status === "completed" ? "Mark active" : "Complete task"}
        </button>
        <button
          type="button"
          onClick={() => onEdit(task)}
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={() => onDelete(task.id)}
          className="rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700 transition hover:border-rose-200 hover:bg-rose-100"
        >
          Delete
        </button>
      </div>
    </div>
  </article>
);

export default TaskItem;

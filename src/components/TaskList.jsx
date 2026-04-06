import TaskItem from "./TaskItem";

const TaskList = ({
  tasks,
  onToggleStatus,
  onEdit,
  onDelete,
  getDueState,
  activeFilter,
  search,
}) => {
  if (!tasks.length) {
    const hasConstraint = activeFilter !== "all" || Boolean(search.trim());

    return (
      <section className="glass-panel rounded-[32px] p-10 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
          {hasConstraint ? "No matches" : "All clear"}
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold text-slate-900">
          {hasConstraint ? "Try a different filter or search." : "No tasks yet."}
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-600">
          {hasConstraint
            ? "This view is empty right now. Widen the search or switch focus modes to reveal more tasks."
            : "Start with one small next step. Your tasks will be stored locally in this browser."}
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleStatus={onToggleStatus}
          onEdit={onEdit}
          onDelete={onDelete}
          dueState={getDueState(task)}
        />
      ))}
    </section>
  );
};

export default TaskList;

import { useEffect, useMemo, useState } from "react";
import DashboardHeader from "./components/DashboardHeader";
import SidebarFilters from "./components/SidebarFilters";
import StatsCards from "./components/StatsCards";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import {
  clearCompletedTasks,
  createTask,
  deleteTask,
  loadTasks,
  saveTasks,
  updateTask,
} from "./utils/taskStorage";

const startOfToday = () => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
};

const toDateOnlyValue = (date) => date.toISOString().slice(0, 10);

const App = () => {
  const [tasks, setTasks] = useState(() => loadTasks());
  const [activeFilter, setActiveFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const today = useMemo(() => startOfToday(), []);
  const todayValue = toDateOnlyValue(today);

  const getDueState = (task) => {
    if (!task.dueDate || task.status === "completed") {
      return "";
    }

    const due = new Date(`${task.dueDate}T00:00:00`);

    if (due < today) {
      return "overdue";
    }

    if (task.dueDate === todayValue) {
      return "due today";
    }

    return "";
  };

  const taskCounts = useMemo(() => {
    const counts = {
      all: tasks.length,
      active: 0,
      completed: 0,
      "high-priority": 0,
      "due-today": 0,
      overdue: 0,
    };

    tasks.forEach((task) => {
      if (task.status === "active") {
        counts.active += 1;
      }

      if (task.status === "completed") {
        counts.completed += 1;
      }

      if (task.priority === "high") {
        counts["high-priority"] += 1;
      }

      const dueState = getDueState(task);

      if (dueState === "due today") {
        counts["due-today"] += 1;
      }

      if (dueState === "overdue") {
        counts.overdue += 1;
      }
    });

    return counts;
  }, [tasks, today, todayValue]);

  const stats = useMemo(
    () => ({
      total: tasks.length,
      active: taskCounts.active,
      completed: taskCounts.completed,
      dueToday: taskCounts["due-today"],
    }),
    [taskCounts, tasks.length],
  );

  const visibleTasks = useMemo(() => {
    const normalizedQuery = search.trim().toLowerCase();

    return tasks
      .filter((task) => {
        if (!normalizedQuery) {
          return true;
        }

        return [task.title, task.description]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);
      })
      .filter((task) => {
        switch (activeFilter) {
          case "active":
            return task.status === "active";
          case "completed":
            return task.status === "completed";
          case "high-priority":
            return task.priority === "high";
          case "due-today":
            return getDueState(task) === "due today";
          case "overdue":
            return getDueState(task) === "overdue";
          default:
            return true;
        }
      })
      .sort((first, second) => {
        if (first.status !== second.status) {
          return first.status === "active" ? -1 : 1;
        }

        const priorityOrder = { high: 0, medium: 1, low: 2 };
        const priorityGap =
          priorityOrder[first.priority] - priorityOrder[second.priority];

        if (priorityGap !== 0) {
          return priorityGap;
        }

        if (first.dueDate && second.dueDate) {
          return first.dueDate.localeCompare(second.dueDate);
        }

        if (first.dueDate) {
          return -1;
        }

        if (second.dueDate) {
          return 1;
        }

        return second.updatedAt.localeCompare(first.updatedAt);
      });
  }, [activeFilter, search, tasks]);

  const handleCreateTask = (taskInput) => {
    const nextTask = createTask(taskInput);
    setTasks((current) => [nextTask, ...current]);
    setIsTaskFormOpen(false);
  };

  const handleEditTask = (taskInput) => {
    if (!editingTask) {
      return;
    }

    setTasks((current) => updateTask(editingTask.id, taskInput, current));
    setEditingTask(null);
    setIsTaskFormOpen(false);
  };

  const handleToggleStatus = (task) => {
    setTasks((current) =>
      updateTask(
        task.id,
        { status: task.status === "completed" ? "active" : "completed" },
        current,
      ),
    );
  };

  const handleDeleteTask = (taskId) => {
    setTasks((current) => deleteTask(taskId, current));
  };

  const handleClearCompleted = () => {
    setTasks((current) => clearCompletedTasks(current));
  };

  const openCreateForm = () => {
    setEditingTask(null);
    setIsTaskFormOpen(true);
  };

  const openEditForm = (task) => {
    setEditingTask(task);
    setIsTaskFormOpen(true);
  };

  const closeForm = () => {
    setEditingTask(null);
    setIsTaskFormOpen(false);
  };

  return (
    <div className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <DashboardHeader
          search={search}
          onSearchChange={setSearch}
          onOpenFilters={() => setIsMobileFiltersOpen(true)}
          onOpenTaskForm={openCreateForm}
          taskCount={tasks.length}
        />

        <StatsCards stats={stats} />

        <div className="grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)]">
          <div className="hidden lg:block">
            <SidebarFilters
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              taskCounts={taskCounts}
              completedCount={taskCounts.completed}
              onClearCompleted={handleClearCompleted}
            />
          </div>

          <main className="space-y-4">
            <div className="glass-panel rounded-[28px] p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                    Task stream
                  </p>
                  <h2 className="mt-2 font-display text-2xl font-bold text-slate-900">
                    {visibleTasks.length} task{visibleTasks.length === 1 ? "" : "s"} in
                    view
                  </h2>
                </div>
                <div className="rounded-2xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-600">
                  Focus:{" "}
                  <span className="text-slate-900">
                    {activeFilter.replace("-", " ")}
                  </span>
                </div>
              </div>
            </div>

            <TaskList
              tasks={visibleTasks}
              onToggleStatus={handleToggleStatus}
              onEdit={openEditForm}
              onDelete={handleDeleteTask}
              getDueState={getDueState}
              activeFilter={activeFilter}
              search={search}
            />
          </main>
        </div>
      </div>

      {isMobileFiltersOpen ? (
        <>
          <div
            className="fixed inset-0 z-30 bg-slate-950/30 backdrop-blur-sm lg:hidden"
            onClick={() => setIsMobileFiltersOpen(false)}
          />
          <div className="lg:hidden">
            <SidebarFilters
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              taskCounts={taskCounts}
              completedCount={taskCounts.completed}
              onClearCompleted={handleClearCompleted}
              mobile
              onClose={() => setIsMobileFiltersOpen(false)}
            />
          </div>
        </>
      ) : null}

      {isTaskFormOpen ? (
        <TaskForm
          mode={editingTask ? "edit" : "create"}
          task={editingTask}
          onClose={closeForm}
          onSubmit={editingTask ? handleEditTask : handleCreateTask}
        />
      ) : null}
    </div>
  );
};

export default App;

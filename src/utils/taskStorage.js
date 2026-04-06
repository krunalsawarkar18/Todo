const STORAGE_KEY = "todo-app.tasks";

const isValidTask = (task) =>
  task &&
  typeof task.id === "string" &&
  typeof task.title === "string" &&
  typeof task.description === "string" &&
  (task.status === "active" || task.status === "completed") &&
  ["low", "medium", "high"].includes(task.priority) &&
  (typeof task.dueDate === "string" || task.dueDate === null) &&
  typeof task.createdAt === "string" &&
  typeof task.updatedAt === "string";

const generateId = () => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `task-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
};

export const loadTasks = () => {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(isValidTask) : [];
  } catch {
    return [];
  }
};

export const saveTasks = (tasks) => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

export const createTask = (taskInput) => {
  const timestamp = new Date().toISOString();

  return {
    id: generateId(),
    title: taskInput.title.trim(),
    description: taskInput.description?.trim() ?? "",
    status: taskInput.status ?? "active",
    priority: taskInput.priority ?? "medium",
    dueDate: taskInput.dueDate || null,
    createdAt: timestamp,
    updatedAt: timestamp,
  };
};

export const updateTask = (id, patch, tasks) =>
  tasks.map((task) =>
    task.id === id
      ? {
          ...task,
          ...patch,
          title: typeof patch.title === "string" ? patch.title.trim() : task.title,
          description:
            typeof patch.description === "string"
              ? patch.description.trim()
              : task.description,
          dueDate:
            typeof patch.dueDate === "string"
              ? patch.dueDate || null
              : task.dueDate,
          updatedAt: new Date().toISOString(),
        }
      : task,
  );

export const deleteTask = (id, tasks) => tasks.filter((task) => task.id !== id);

export const clearCompletedTasks = (tasks) =>
  tasks.filter((task) => task.status !== "completed");

export { STORAGE_KEY };

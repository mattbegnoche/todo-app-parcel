// Theme constants
const THEME_STORAGE_KEY = 'todo-app-theme';
const THEME_LIGHT = 'light';
const THEME_DARK = 'dark';

export const state = {
  tasks: [
    {
      id: 1,
      text: 'Complete project documentation',
      completed: true,
    },
    {
      id: 2,
      text: 'Review pull requests',
      completed: true,
    },
    {
      id: 3,
      text: 'Update dependencies',
      completed: false,
    },
    {
      id: 4,
      text: 'Write unit tests',
      completed: false,
    },
    {
      id: 5,
      text: 'Deploy to staging',
      completed: false,
    },
    {
      id: 6,
      text: 'Share with mom',
      completed: false,
    },
  ],
  // Theme state - 'light' or 'dark'
  theme: null,
  numberOfIncompleteTasks() {
    return this.tasks.filter(t => !t.completed).length;
  },
};

export const getTasks = function (filter = 'all') {
  switch (filter) {
    case 'active':
      return state.tasks.filter(t => !t.completed);
    case 'completed':
      return state.tasks.filter(t => t.completed);
    case 'all':
    default:
      return [...state.tasks];
  }
};

export const updateTask = function (taskId, taskCompeletedStatus) {
  const task = state.tasks.find(t => t.id === taskId);
  if (!task) return 'No task found';
  task.completed = taskCompeletedStatus;
  return state.tasks;
};

export const addTask = function (text) {
  const task = {
    id: Date.now() + Math.floor(Math.random() * 1000),
    text: text,
    completed: false,
  };
  state.tasks.push(task);
  return state.tasks;
};

export const deleteTask = function (taskId) {
  const taskIndex = state.tasks.findIndex(t => t.id === taskId);
  if (taskIndex === -1) return 'No task found';
  state.tasks.splice(taskIndex, 1);
  return state.tasks;
};

export const clearCompletedTasks = function () {
  const incompleteTasks = state.tasks.filter(t => !t.completed);
  state.tasks = incompleteTasks;
  return state.tasks;
};

export const reorderTasks = function (newOrder) {
  const reorderedTasks = newOrder
    .map(id => state.tasks.find(task => task.id === id))
    .filter(Boolean);
  state.tasks = reorderedTasks;
  return state.tasks;
};

export const initTheme = function () {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  if (savedTheme === THEME_LIGHT || savedTheme === THEME_DARK) {
    state.theme = savedTheme;
    return state.theme;
  }

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  state.theme = prefersDark ? THEME_DARK : THEME_LIGHT;
  return state.theme;
};

export const toggleTheme = function () {
  state.theme = state.theme === THEME_LIGHT ? THEME_DARK : THEME_LIGHT;
  localStorage.setItem(THEME_STORAGE_KEY, state.theme);
  return state.theme;
};

export const getTheme = function () {
  return state.theme;
};

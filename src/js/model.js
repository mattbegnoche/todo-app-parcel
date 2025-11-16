export const state = {
  tasks: [
    {
      id: 1,
      text: 'Complete project documentation',
      completed: false,
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
      completed: true,
    },
    {
      id: 6,
      text: 'Share with your mom',
      completed: true,
    },
  ],
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
  state.tasks.unshift(task);
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

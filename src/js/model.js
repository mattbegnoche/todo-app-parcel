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
  ],
};

export const getTasks = function (filter = 'all') {
  switch (filter) {
    case 'active':
      return state.tasks.filter(t => !t.completed);
    case 'complete':
      return state.tasks.filter(t => t.completed);
    case 'all':
    default:
      return [...state.tasks];
  }
};

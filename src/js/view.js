class AppView {
  // App UI Elements
  _btnTheme = document.querySelector('.btn__theme');
  _inputField = document.querySelector('.form__input');
  _taskList = document.querySelector('.tasks-list');
  _tasksCounter = document.querySelector('.tasks-counter');
  _btnAll = document.querySelector('[data-filter="all"]');
  _btnActive = document.querySelector('[data-filter="active"]');
  _btnComplete = document.querySelector('[data-filter="complete"]');
  _btnClearCompleted = document.querySelector('.btn__clear');
}

export default new AppView();

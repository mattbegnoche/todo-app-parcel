import * as model from './model.js';
import appView from './view.js';

const controlTasks = function () {
  appView.renderTasks(model.state.tasks);
};

const controlCounter = function () {
  appView.updateItemsLeft(model.state.numberOfIncompleteTasks());
};

const controlFilter = function (e) {
  const btn = e.target.closest('[data-filter]');
  if (!btn || !btn.dataset) return;

  const filter = btn.dataset.filter || 'all';

  const tasks = model.getTasks(filter);

  appView.renderTasks(tasks);
  appView.updateActivefilter(filter);
};

const controlClearCompleted = function () {
  const tasks = model.clearCompletedTasks();
  appView.updateActivefilter('all');
  appView.renderTasks(tasks);
};

const controlUpdateTask = function (e) {
  const checkbox = e.target.closest('.tasks-list__item input');
  if (!checkbox) return;
  const id = +checkbox.id;
  model.updateTask(id, checkbox.checked);
  appView.updateItemsLeft(model.state.numberOfIncompleteTasks());
};

const controlAddTask = function () {
  model.addTask(appView.getQuery());
  appView.renderTasks(model.state.tasks);
  appView.updateItemsLeft(model.state.numberOfIncompleteTasks());
};

const controlDeleteTask = function (e) {
  const btn = e.target.closest('.btn__delete-task');
  if (!btn) return;

  const task = btn.closest('.tasks-list__item');
  if (!task) return;

  const id = +task.dataset.id;

  model.deleteTask(id);
  appView.renderTasks(model.state.tasks);
  appView.updateItemsLeft(model.state.numberOfIncompleteTasks());
};

const controlDragDrop = function () {
  const items = document.querySelectorAll('.tasks-list__item');
  const newOrder = Array.from(items).map(item => +item.dataset.id);
  model.reorderTasks(newOrder);
};

const controlThemeToggle = function () {
  const newTheme = model.toggleTheme();

  appView.updateTheme(newTheme);
};

const controlThemeInit = function () {
  const theme = model.initTheme();

  appView.updateTheme(theme);
};

const init = function () {
  appView.addHandlerInitTheme(controlThemeInit);
  appView.addHandlerRender(controlTasks);
  appView.addHandlerRender(controlCounter);
  appView.addHandlerFilter(controlFilter);
  appView.addHandlerClearCompleted(controlClearCompleted);
  appView.addHandlerDeleteTask(controlDeleteTask);
  appView.addHandlerAddTask(controlAddTask);
  appView.addHandlerUpdateTask(controlUpdateTask);
  appView.addHandlerDragAndDrop(controlDragDrop);
  appView.addHandlerThemeToggle(controlThemeToggle);
};
init();

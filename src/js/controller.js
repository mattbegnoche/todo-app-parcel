import * as model from './model.js';
import appView from './view.js';

const controlTasks = function () {
  // Render Tasks
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

const init = function () {
  appView.addHandlerRender(controlTasks);
  appView.addHandlerRender(controlCounter);
  appView.addHandlerFilter(controlFilter);
  appView.addHandlerClearCompleted(controlClearCompleted);
  appView.addHandlerDeleteTask(controlDeleteTask);
};
init();

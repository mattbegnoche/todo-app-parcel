import * as model from './model.js';
import appView from './view.js';

const controlTasks = function () {
  // Render Tasks
  appView.renderTasks(model.state.tasks);
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

const init = function () {
  appView.addHandlerRender(controlTasks);
  appView.addHandlerFilter(controlFilter);
  appView.addHandlerClearCompleted(controlClearCompleted);
};
init();

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

/**
 * Handle theme toggle button click
 * Toggles between light and dark mode and updates the view
 */
const controlThemeToggle = function () {
  // Toggle theme in model (also persists to localStorage)
  const newTheme = model.toggleTheme();

  // Update view to reflect new theme
  appView.updateTheme(newTheme);
};

/**
 * Initialize theme on page load
 * Respects user's saved preference or system preference
 */
const controlThemeInit = function () {
  // Get initial theme from model (checks localStorage and system preference)
  const theme = model.initTheme();

  // Apply theme to view
  appView.updateTheme(theme);
};

const init = function () {
  // Initialize theme first (before rendering)
  controlThemeInit();

  // Render tasks and setup handlers
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

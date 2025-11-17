class AppView {
  // App UI Elements
  _btnTheme = document.querySelector('.btn__theme');
  _formAddTask = document.querySelector('.form');
  _inputField = document.querySelector('.form__input');
  _taskList = document.querySelector('.tasks-list');
  _taskCheckboxs = document.querySelectorAll('.tasks-list__item input');
  _tasksCounter = document.querySelector('.tasks-counter');
  _tasksOverview = document.querySelector('.tasks-overview');
  _btnFilters = document.querySelectorAll('.btn__filter');
  _btnClearCompleted = document.querySelector('.btn__clear');

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  addHandlerFilter(handler) {
    this._tasksOverview.addEventListener('click', handler);
  }

  addHandlerClearCompleted(handler) {
    this._btnClearCompleted.addEventListener('click', handler);
  }

  addHandlerUpdateTask(handler) {
    if (!this._taskList) return;
    this._taskList.addEventListener('change', handler);
  }

  addHandlerAddTask(handler) {
    this._formAddTask.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }

  addHandlerDeleteTask(handler) {
    this._taskList.addEventListener('click', handler);
  }

  /**
   * Attach theme toggle handler
   * Listens for clicks on the theme button
   */
  addHandlerThemeToggle(handler) {
    if (!this._btnTheme) return;
    this._btnTheme.addEventListener('click', handler);
  }

  /**
   * Update the theme in the DOM and button state
   * @param {string} theme - 'light' or 'dark'
   */
  updateTheme(theme) {
    // Set data attribute on root element for CSS targeting
    document.documentElement.setAttribute('data-theme', theme);

    // Update button aria-label for screen readers
    const label =
      theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
    this._btnTheme.setAttribute('aria-label', label);

    // Update button pressed state for accessibility
    this._btnTheme.setAttribute('aria-pressed', theme === 'dark');
  }

  addHandlerDragAndDrop(handler) {
    if (!this._taskList) return;

    this._taskList.addEventListener('dragstart', function (e) {
      console.log(e.target);
      const item = e.target.closest('.tasks-list__item');
      if (!item) return;
      e.dataTransfer.effectAllowed = 'move';
      item.classList.add('dragging');
    });

    this._taskList.addEventListener('dragend', function (e) {
      const item = e.target.closest('.tasks-list__item');
      if (!item) return;
      item.classList.remove('dragging');
    });

    this._taskList.addEventListener('dragover', e => {
      e.preventDefault();
      const draggingItem = this._taskList.querySelector('.dragging');
      if (!draggingItem) return;

      const afterElement = this._getDragAfterElement(e.clientY);

      if (afterElement == null) {
        this._taskList.appendChild(draggingItem);
      } else {
        this._taskList.insertBefore(draggingItem, afterElement);
      }
    });

    this._taskList.addEventListener('drop', e => {
      e.preventDefault();
      handler();
    });
  }

  _getDragAfterElement(y) {
    const draggableElements = [
      ...this._taskList.querySelectorAll('.tasks-list__item:not(.dragging)'),
    ];

    return draggableElements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      { offset: Number.NEGATIVE_INFINITY }
    ).element;
  }

  getQuery() {
    const query = this._inputField.value;
    this._clearQuery();
    return query;
  }

  _clearQuery() {
    this._inputField.value = '';
  }

  renderTasks(data) {
    const html = data.map(t => this._generateMarkUp(t)).join('');
    this._clearTaskList();
    this._taskList.insertAdjacentHTML('afterbegin', html);
  }

  updateActivefilter(filter) {
    this._btnFilters.forEach(f => {
      f.classList.remove('btn__filter--active');
      if (f.dataset.filter === filter) f.classList.add('btn__filter--active');
    });
  }

  updateItemsLeft(itemsLeft) {
    this._tasksCounter.textContent = `${itemsLeft} items left`;
  }

  _generateMarkUp(dataTask) {
    return `
          <li class="tasks-list__item" data-id="${
            dataTask.id
          }" draggable="true">
            <input
            type="checkbox"
            id="${dataTask.id}"
            name="${dataTask.id}"
            ${dataTask.completed ? 'checked' : ''}
            />
            <label for="${dataTask.id}">${dataTask.text}</label>
            <button class="btn__delete-task" aria-label="Delete task">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M17.6777 0.707107L16.9706 0L8.83883 8.13173L0.707107 0L0 0.707107L8.13173 8.83883L0 16.9706L0.707106 17.6777L8.83883 9.54594L16.9706 17.6777L17.6777 16.9706L9.54594 8.83883L17.6777 0.707107Z"
              fill="#494C6B"
              />
            </svg>
            </button>
          </li>
  `;
  }

  _clearTaskList() {
    this._taskList.innerHTML = '';
  }
}

export default new AppView();

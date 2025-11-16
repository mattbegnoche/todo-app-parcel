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
    // TODO - Create a function to
    this._tasksCounter.textContent = `${itemsLeft} items left`;
  }

  _generateMarkUp(dataTask) {
    return `
            <li class="tasks-list__item" data-id=${dataTask.id}>
              <input type="checkbox" id="${dataTask.id}" name="${
      dataTask.id
    }" ${dataTask.completed ? 'checked' : ''} />
              <label for="${dataTask.id}">${dataTask.text}</label>
              <button class="btn__delete-task">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
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

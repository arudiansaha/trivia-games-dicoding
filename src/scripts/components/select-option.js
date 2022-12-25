class SelectOption extends HTMLElement {
  set categories(categories) {
    this._categories = categories;
    this.render();
  }

  set startEvent(event) {
    this._startEvent = event;
    this.render();
  }

  set resetEvent(event) {
    this._resetEvent = event;
    this.render();
  }

  get value() {
    const selectElement = this.querySelector('select');
    return selectElement.options[selectElement.selectedIndex];
  }

  render() {
    this.setAttribute('class', 'flex justify-center items-center gap-4');
    this.innerHTML = `
      <div class="flex">
        <select class="max-md:w-full py-4 px-8 rounded-l-lg border border-neutral-300 bg-neutral-100 dark:border-neutral-600 dark:bg-neutral-800">
          ${this._categories.map(({ id, name }) => `<option value="${id}">${name}</option>`).join('')}
        </select>
        <button id="start-question-button" class="py-4 px-8 rounded-r-lg border-y border-r border-neutral-300 bg-neutral-50 dark:border-neutral-600 dark:bg-neutral-900">
          Start
        </button>
      </div>
      <button id="reset-record-button" class="w-fit py-4 px-8 rounded-lg bg-rose-500 text-white">Reset</button>
    `;
    this.querySelector('#start-question-button').addEventListener('click', this._startEvent);
    this.querySelector('#reset-record-button').addEventListener('click', this._resetEvent);
  }
}

customElements.define('select-option', SelectOption);

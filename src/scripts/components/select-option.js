class SelectOption extends HTMLElement {
  set categories(categories) {
    this._categories = categories;
    this.render();
  }

  set clickEvent(event) {
    this._clickEvent = event;
    this.render();
  }

  get value() {
    const selectElement = this.querySelector('#categories-select');
    return selectElement.options[selectElement.selectedIndex].value;
  }

  render() {
    this.setAttribute('class', 'flex justify-center items-center');
    this.innerHTML = `
      <select id="categories-select" class="py-4 px-8 rounded-l-lg border border-neutral-300 bg-neutral-100 dark:border-neutral-600 dark:bg-neutral-800">
        ${this._categories.map(({ id, name }) => `<option value="${id}">${name}</option>`).join('')}
      </select>
      <button id="categories-button" class="py-4 px-8 rounded-r-lg border-y border-r border-neutral-300 bg-neutral-50 dark:border-neutral-600 dark:bg-neutral-900">
        Start
      </button>
    `;
    this.querySelector('#categories-button').addEventListener('click', this._clickEvent);
  }
}

customElements.define('select-option', SelectOption);

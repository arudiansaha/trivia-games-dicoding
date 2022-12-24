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
    const selectElement = this.querySelector('select');
    return selectElement.options[selectElement.selectedIndex];
  }

  render() {
    this.setAttribute('class', 'flex justify-center items-center');
    this.innerHTML = `
      <select class="max-md:w-full py-4 px-8 rounded-l-lg border border-neutral-300 bg-neutral-100 dark:border-neutral-600 dark:bg-neutral-800">
        ${this._categories.map(({ id, name }) => `<option value="${id}">${name}</option>`).join('')}
      </select>
      <button class="py-4 px-8 rounded-r-lg border-y border-r border-neutral-300 bg-neutral-50 dark:border-neutral-600 dark:bg-neutral-900">
        Start
      </button>
    `;
    this.querySelector('button').addEventListener('click', this._clickEvent);
  }
}

customElements.define('select-option', SelectOption);

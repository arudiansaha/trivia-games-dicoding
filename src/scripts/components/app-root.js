class AppRoot extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.setAttribute('class', 'block min-h-screen font-sans bg-neutral-50 text-neutral-800 dark:bg-neutral-900 dark:text-neutral-100');
  }
}

customElements.define('app-root', AppRoot);

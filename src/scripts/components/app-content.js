class AppContent extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.setAttribute('class', 'block max-w-3xl mx-auto py-6');
  }
}

customElements.define('app-content', AppContent);

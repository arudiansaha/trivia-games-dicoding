class AppContent extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.setAttribute('class', 'block max-w-3xl mx-auto p-6');
    this.innerHTML = '';
  }
}

customElements.define('app-content', AppContent);

class AppBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.setAttribute('class', 'flex justify-center items-center py-4');
    this.innerHTML = '<h2 class="text-3xl font-black">Trivia Apps</h2>';
  }
}

customElements.define('app-bar', AppBar);

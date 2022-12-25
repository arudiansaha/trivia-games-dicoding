class RecordTable extends HTMLElement {
  set scores(scores) {
    this._scores = scores;
    this.render();
  }

  render() {
    this.setAttribute('class', 'block');
    this.innerHTML = `
    <div class="my-4 rounded-lg border border-neutral-200 dark:border-neutral-600 overflow-hidden">
      <table class="table-auto w-full text-left">
        <thead class="bg-neutral-100 dark:bg-neutral-800">
          <tr>
            <th class="py-2 px-4">Category</th>
            <th class="py-2 px-4">Date</th>
            <th class="py-2 px-4">Score</th>
            <th class="py-2 px-4">Time</th>
          </tr>
        </thead>
        <tbody class="bg-neutral-50 dark:bg-neutral-900">
          ${this._scores.map((score) => `
            <tr class="border-t border-neutral-200 dark:border-neutral-600">
              <td class="py-2 px-4">${score.category}</td>
              <td class="py-2 px-4">${score.date}</td>
              <td class="py-2 px-4">${score.score}</td>
              <td class="py-2 px-4">${score.time}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
    `;
  }
}

customElements.define('record-table', RecordTable);

/* eslint-disable camelcase */
class QuestionItem extends HTMLElement {
  set question(question) {
    this._question = question;
    this.render();
  }

  render() {
    this.setAttribute('class', 'flex flex-col gap-2 p-4 rounded-lg border border-neutral-200 bg-neutral-100 dark:border-neutral-600 dark:bg-neutral-800');

    const {
      category,
      question,
      difficulty,
      correct_answer,
      incorrect_answers,
    } = this._question;

    const answers = [correct_answer, ...incorrect_answers].sort(() => 0.5 - Math.random());
    const name = category.toLowerCase().replace(/:\s|\s/g, '-');
    const alphabet = ['A', 'B', 'C', 'D'];

    this.innerHTML = `
      <div class="flex justify-between items-center">
        <h3 class="text-2xl font-bold">${category}<h3>
        <span class="font-medium uppercase">${difficulty}</span>
      </div>
      <p class="text-neutral-500 dark:text-neutral-400">${question}</p>
      <select name="${name}" class="bg-neutral-100 dark:bg-neutral-800" multiple required>
        ${answers.map((answer, index) => `
          <option value="${answer}" class="w-fit text-neutral-500 dark:text-neutral-400 checked:bg-transparent checked:text-blue-500 dark:checked:text-blue-400">
            ${alphabet[index]}. ${answer}
          </option>
        `).join('')}
      </select>
    `;
  }
}

customElements.define('question-item', QuestionItem);

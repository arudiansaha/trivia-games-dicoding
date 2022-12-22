import './question-item';

class QuestionList extends HTMLElement {
  set questions(questions) {
    this._questions = questions;
    this.render();
  }

  render() {
    this.setAttribute('class', 'flex flex-col gap-6');
    this._questions.forEach((question) => {
      const itemELement = document.createElement('question-item');
      itemELement.question = question;
      this.appendChild(itemELement);
    });

    const submitElement = document.createElement('div');
    submitElement.setAttribute('class', 'flex justify-center items-center');
    submitElement.innerHTML = '<button class="py-2 px-6 rounded-lg bg-blue-500 text-neutral-50">Submit</button>';
    this.appendChild(submitElement);
  }
}

customElements.define('question-list', QuestionList);

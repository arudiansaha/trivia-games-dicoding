import './question-item';

class QuestionList extends HTMLElement {
  constructor() {
    super();
    this._correctAnswers = [];
    this._answers = [];
  }

  set questions(questions) {
    this._questions = questions;
  }

  set answers(answers) {
    this._answers = answers;
  }

  set clickEvent(event) {
    this._clickEvent = event;
  }

  get value() {
    return this._correctAnswers.filter((x) => this._answers.includes(x)).length * 10;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.setAttribute('class', 'flex flex-col gap-6');

    const correctAnswers = [];

    this._questions.forEach((question) => {
      const itemELement = document.createElement('question-item');
      itemELement.question = question;
      this.appendChild(itemELement);
      correctAnswers.push(question.correct_answer);
    });

    this._correctAnswers = correctAnswers;

    const submitElement = document.createElement('div');
    submitElement.setAttribute('class', 'flex justify-center items-center');
    submitElement.innerHTML = '<button class="py-2 px-6 rounded-lg bg-blue-500 text-neutral-50">Submit</button>';
    this.appendChild(submitElement);

    this.querySelector('button').addEventListener('click', this._clickEvent);
  }
}

customElements.define('question-list', QuestionList);

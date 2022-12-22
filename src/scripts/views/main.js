import Api from '../data/api';
import '../components/select-option';
import '../components/question-list';

export default async function main() {
  const api = new Api();
  const token = await api.sessionToken();

  const contentElement = document.querySelector('app-content');
  const optionELement = document.createElement('select-option');

  optionELement.categories = await api.categories();
  contentElement.appendChild(optionELement);

  optionELement.clickEvent = async () => {
    const questionsELement = document.createElement('question-list');
    questionsELement.questions = await api.questions(token, optionELement.value);

    contentElement.innerHTML = '';
    contentElement.appendChild(questionsELement);
  };
}

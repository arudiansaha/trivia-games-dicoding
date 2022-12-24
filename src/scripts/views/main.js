import Api from '../data/api';
import '../components/select-option';
import '../components/record-table';
import '../components/question-list';

const TOKEN_KEY = 'SESSION_TOKEN';
const SCORES_KEY = 'SCORES_RECORD';

const scores = [];
const api = new Api();

function isStorageExist() {
  if (typeof (Storage) !== 'undefined') return true;

  console.error('Browser tidak mendukung local storage');
  return false;
}

function saveData() {
  if (!isStorageExist()) return;

  const parsed = JSON.stringify(scores);
  localStorage.setItem(SCORES_KEY, parsed);
}

function loadData() {
  const serializedData = localStorage.getItem(SCORES_KEY);
  const data = JSON.parse(serializedData);

  if (data !== null) data.forEach((score) => scores.push(score));
}

async function generateToken() {
  const token = localStorage.getItem(TOKEN_KEY)
    ? localStorage.getItem(TOKEN_KEY)
    : localStorage.setItem(TOKEN_KEY, await api.sessionToken());

  return token;
}

function generateId() {
  return `trivia-${+new Date()}`;
}

function makeData(id, category, score) {
  return {
    id,
    category,
    date: new Date().toLocaleDateString(),
    score,
    time: new Date().toLocaleTimeString(),
  };
}

export default async function main() {
  loadData();

  const contentElement = document.querySelector('app-content');
  const optionELement = document.createElement('select-option');
  const recordElement = document.createElement('record-table');
  const questionsELement = document.createElement('question-list');

  optionELement.categories = await api.categories();
  recordElement.scores = scores;
  contentElement.appendChild(optionELement);
  contentElement.appendChild(recordElement);

  optionELement.clickEvent = async () => {
    try {
      const token = await generateToken();
      const category = optionELement.value.value;
      const questions = await api.questions(token, category);

      if (questions.length === 0) {
        localStorage.removeItem(TOKEN_KEY);
      } else {
        contentElement.innerHTML = '';
        questionsELement.questions = questions;
        contentElement.appendChild(questionsELement);
      }
    } catch (error) {
      console.error(error);
    }
  };

  questionsELement.clickEvent = () => {
    const answers = [];

    const selectElement = document.querySelectorAll('select');
    selectElement.forEach((select) => answers.push(select.selectedOptions[0].value));
    questionsELement.answers = answers;

    const scoreId = generateId();
    const score = makeData(scoreId, optionELement.value.label, questionsELement.value);
    scores.push(score);
    saveData();
    window.location.reload();
  };
}

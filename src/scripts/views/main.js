import Api from '../data/api';
import '../components/select-option';
import '../components/record-table';
import '../components/question-list';

const TOKEN_KEY = 'SESSION_TOKEN';
const SCORES_KEY = 'SCORES_RECORD';

const scores = [];
const api = new Api();

const contentElement = document.querySelector('app-content');
const optionELement = document.createElement('select-option');
const recordElement = document.createElement('record-table');
const questionsELement = document.createElement('question-list');

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

  if (data === null) return;
  data.forEach((score) => scores.push(score));
}

async function generateToken() {
  try {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token === null) localStorage.setItem(TOKEN_KEY, await api.sessionToken());
    return;
  } catch (error) {
    console.error(error);
  }
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

async function startHandler() {
  try {
    const token = await generateToken();
    const category = optionELement.value.value;
    const questions = await api.questions(token, category);

    if (questions.length === 0) localStorage.removeItem(TOKEN_KEY);

    if (questions.length > 0) {
      contentElement.innerHTML = '';
      questionsELement.questions = questions;
      contentElement.appendChild(questionsELement);
    }
  } catch (error) {
    console.error(error);
  }
}

function resetHandler() {
  localStorage.setItem(SCORES_KEY, '[]');
  window.location.reload();
}

function submitHandler() {
  const answers = [];

  const selectElement = document.querySelectorAll('select');
  selectElement.forEach((select) => answers.push(select.selectedOptions[0].value));
  questionsELement.answers = answers;

  const scoreId = generateId();
  const score = makeData(scoreId, optionELement.value.label, questionsELement.value.toString());
  scores.push(score);
  saveData();
  window.location.reload();
}

export default async function main() {
  loadData();

  optionELement.categories = await api.categories();
  recordElement.scores = scores;

  contentElement.appendChild(optionELement);
  contentElement.appendChild(recordElement);

  optionELement.startEvent = startHandler;
  optionELement.resetEvent = resetHandler;

  questionsELement.clickEvent = submitHandler;
}

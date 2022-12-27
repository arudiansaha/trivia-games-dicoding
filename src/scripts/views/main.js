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

const isStorageExist = () => {
  if (typeof (Storage) !== 'undefined') return true;

  console.error('Browser tidak mendukung local storage');
  return false;
};

const saveData = () => {
  if (!isStorageExist()) return;

  const parsed = JSON.stringify(scores);
  localStorage.setItem(SCORES_KEY, parsed);
};

const loadData = () => {
  const serializedData = localStorage.getItem(SCORES_KEY);
  const data = JSON.parse(serializedData);

  if (data === null) return;
  data.forEach((score) => scores.push(score));
};

const generateToken = async () => {
  try {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token === null) localStorage.setItem(TOKEN_KEY, await api.sessionToken());
    return;
  } catch (error) {
    console.error(error);
  }
};

const generateId = () => `trivia-${+new Date()}`;

const makeData = (id, category, score) => ({
  id,
  category,
  date: new Date().toLocaleDateString(),
  score,
  time: new Date().toLocaleTimeString(),
});

const startHandler = async () => {
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
};

const resetHandler = () => {
  localStorage.setItem(SCORES_KEY, '[]');
  window.location.reload();
};

const submitHandler = () => {
  const answers = [];

  const selectElement = document.querySelectorAll('select');
  selectElement.forEach((select) => answers.push(select.selectedOptions[0].value));
  questionsELement.answers = answers;

  const scoreId = generateId();
  const score = makeData(scoreId, optionELement.value.label, questionsELement.value.toString());
  scores.push(score);
  saveData();
  window.location.reload();
};

const main = async () => {
  loadData();

  optionELement.categories = await api.categories();
  recordElement.scores = scores;

  contentElement.appendChild(optionELement);
  contentElement.appendChild(recordElement);

  optionELement.startEvent = startHandler;
  optionELement.resetEvent = resetHandler;

  questionsELement.clickEvent = submitHandler;
};

export default main;

import { loadQuestions, quiz } from './src/gameLogic';

const allQuestions = loadQuestions();
quiz(allQuestions).catch(console.error);

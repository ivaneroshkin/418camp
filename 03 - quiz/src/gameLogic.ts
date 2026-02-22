import * as fs from 'fs';
import * as readlineSync from 'readline-sync';
import { styleText } from 'node:util';

export interface Question {
  id: number;
  question: string;
  correctAnswer: number;
  answers: string[];
}

interface QuestionsData {
  questions: Question[];
}

export function loadQuestions(): Question[] {
  const data = fs.readFileSync('./questions.json', 'utf8');
  const questionsData: QuestionsData = JSON.parse(data);
  return questionsData.questions;
}

export function quiz(questions: Question[]): void {
  const fiveQuestions = getFiveRandomQuestions(questions);
  const correctCount = askQuestions(fiveQuestions);
  const totalQuestions = fiveQuestions.length;
  
  displayFinalResult(correctCount, totalQuestions);
}

function getFiveRandomQuestions(array: Question[]): Question[] {
  return array.sort(() => Math.random() - 0.5).slice(0, 5);
}

function askQuestions(questionsArray: Question[]): number {
  let counter = 0;
  questionsArray.forEach((question: Question) => {
    console.log(styleText('cyan', `\nQuestion:\n  ${question.question}\n`));
    let index = readlineSync.keyInSelect(question.answers, `Your answer:`);
    if (index < 0) {
      console.log(styleText('yellow', `Last chance to answer`));
      index = readlineSync.keyInSelect(question.answers, `Your answer:`);
    }
    if (question.correctAnswer === index + 1) {
      counter++;
      console.log(styleText('green', '✓ Correct!\n'));
    } else {
      console.log(styleText('red', '✗ Wrong!') + ` The correct answer was: ${styleText(['green', 'underline'], question.answers[question.correctAnswer - 1])}\n`);
    }
  });
  return counter;
}

function displayFinalResult(correctCount: number, totalQuestions: number): void {
  console.log('\n' + '='.repeat(50));
  
  if (correctCount === totalQuestions) {
    console.log(styleText('green', `🎉 Perfect! You got all ${correctCount} out of ${totalQuestions} correct!`));
  } else if (correctCount >= totalQuestions / 2) {
    console.log(styleText('yellow', `👍 Good job! You got ${correctCount} out of ${totalQuestions} correct!`));
  } else {
    console.log(styleText('red', `📚 Keep learning! You got ${correctCount} out of ${totalQuestions} correct.`));
  }
  
  console.log('='.repeat(50) + '\n');
}

import * as fs from 'fs';
import * as readline from 'node:readline/promises';
import { styleText } from 'node:util';
import { titleScreen } from './titleScreen';

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

export async function quiz(questions: Question[]): Promise<void> {
  titleScreen();
  
  const fiveQuestions = getFiveRandomQuestions(questions);
  const correctCount = await askQuestions(fiveQuestions);
  const totalQuestions = fiveQuestions.length;
  
  displayFinalResult(correctCount, totalQuestions);
}

export function getFiveRandomQuestions(array: Question[]): Question[] {
  return array.sort(() => Math.random() - 0.5).slice(0, 5);
}

export async function askQuestions(questionsArray: Question[]): Promise<number> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  let counter = 0;
  
  for (const question of questionsArray) {
    console.log(styleText('cyan', `\nQuestion:\n  ${question.question}\n`));
    
    question.answers.forEach((answer, idx) => {
      console.log(`[${idx + 1}] ${answer}`);
    });
    
    let userInput = await rl.question('\nYour answer (enter number or "q" to quit): ');
    
    if (userInput.toLowerCase() === 'q') {
      rl.close();
      console.log(styleText('yellow', '\n👋 Thanks for playing! Game ended early.\n'));
      process.exit(0);
    }
    
    let index = parseInt(userInput) - 1;
    
    if (isNaN(index) || index < 0 || index >= question.answers.length) {
      console.log(styleText('yellow', 'Invalid input. Last chance to answer'));
      question.answers.forEach((answer, idx) => {
        console.log(`[${idx + 1}] ${answer}`);
      });
      userInput = await rl.question('\nYour answer (enter number or "q" to quit): ');
      
      if (userInput.toLowerCase() === 'q') {
        rl.close();
        console.log(styleText('yellow', '\n👋 Thanks for playing! Game ended early.\n'));
        process.exit(0);
      }
      
      index = parseInt(userInput) - 1;
    }
    
    if (question.correctAnswer === index + 1) {
      counter++;
      console.log(styleText('green', '✓ Correct!\n'));
    } else {
      console.log(styleText('red', '✗ Wrong!') + ` The correct answer was: ${styleText(['green', 'underline'], question.answers[question.correctAnswer - 1])}\n`);
    }
  }
  
  rl.close();
  return counter;
}

export function displayFinalResult(correctCount: number, totalQuestions: number): void {
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

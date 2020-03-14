const fs = require('fs');
const path = require('path');
const readlineSync = require('readline-sync');

const folderPath = './questions';
const pathFilesArray = fs.readdirSync(folderPath).map(fileName => {
  return path.join(folderPath, fileName);
});

function qiuz(arr) {
  const fiveQuestions = getFiveRandomQuestion(arr);
  console.log(`Правильных ответов: ${getQuestion(fiveQuestions)}`);
}

function getFiveRandomQuestion(array) {
  return array.sort(() => Math.random() - 0.5).slice(0, 5);
}

function getInfoFromFile(file) {
  const data = fs.readFileSync(file, 'utf8');
  let dataArrayFromFile = data.split('\n');
  const currentQuestion = dataArrayFromFile[0];
  const correctAnswer = dataArrayFromFile[1];
  const answerArray = dataArrayFromFile.slice(2, dataArrayFromFile.length);
  return { currentQuestion, correctAnswer, answerArray };
}

function getQuestion(gameArray) {
  let counter = 0;
  gameArray.forEach(file => {
    const question = getInfoFromFile(file);
    console.log(`Внимание вопрос:
      ${question.currentQuestion}
      `);
    let index = readlineSync.keyInSelect(question.answerArray, `Ваш ответ:`);
    if (index < 0) {
      console.log(`Последняя возможность дать ответ`);
      index = readlineSync.keyInSelect(question.answerArray, `Ваш ответ:`);
    }
    if (Number(question.correctAnswer) === index + 1) {
      counter++;
    }
  });
  return counter;
}

qiuz(pathFilesArray);

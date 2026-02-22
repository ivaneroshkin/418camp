# Project 3. Quiz

A TypeScript quiz game that loads questions from a JSON file. The program selects 5 random questions and asks them to the user one by one in the command line, receiving answer choices from them. After receiving all answers, the program displays the total number of correct answers.

## Data Structure

Questions are stored in `questions.json` with the following structure:

```json
{
  "questions": [
    {
      "id": 1,
      "question": "Question text here?",
      "correctAnswer": 2,
      "answers": [
        "Answer option 1",
        "Answer option 2",
        "Answer option 3"
      ]
    }
  ]
}
```

## Running the Quiz

```sh
npm i
npm start
```

## Development

```sh
# Run in development mode
npm start

# Build TypeScript to JavaScript
npm run build

# Run production build
npm run start:prod
```

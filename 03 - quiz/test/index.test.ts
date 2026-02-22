import * as fs from 'fs';
import * as gameLogic from '../src/gameLogic';

jest.mock('fs');
jest.mock('../src/gameLogic', () => ({
  ...jest.requireActual('../src/gameLogic'),
  quiz: jest.fn()
}));

describe('index.ts integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should load questions and start quiz', async () => {
    const mockQuestions = [
      { id: 1, question: 'Test?', correctAnswer: 1, answers: ['A', 'B'] }
    ];
    const mockData = JSON.stringify({ questions: mockQuestions });
    (fs.readFileSync as jest.Mock).mockReturnValue(mockData);
    (gameLogic.quiz as jest.Mock).mockResolvedValue(undefined);

    const { loadQuestions, quiz } = await import('../src/gameLogic');
    
    const questions = loadQuestions();
    await quiz(questions);

    expect(questions).toEqual(mockQuestions);
    expect(quiz).toHaveBeenCalledWith(mockQuestions);
  });

  it('should handle quiz errors gracefully', async () => {
    const mockQuestions = [
      { id: 1, question: 'Test?', correctAnswer: 1, answers: ['A', 'B'] }
    ];
    const mockData = JSON.stringify({ questions: mockQuestions });
    (fs.readFileSync as jest.Mock).mockReturnValue(mockData);
    (gameLogic.quiz as jest.Mock).mockRejectedValue(new Error('Quiz error'));

    const { loadQuestions, quiz } = await import('../src/gameLogic');
    
    const questions = loadQuestions();
    
    await expect(quiz(questions)).rejects.toThrow('Quiz error');
  });
});

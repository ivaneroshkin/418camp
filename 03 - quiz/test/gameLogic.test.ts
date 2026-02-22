import * as fs from 'fs';
import * as readline from 'node:readline/promises';
import { loadQuestions, getFiveRandomQuestions, displayFinalResult, askQuestions, Question } from '../src/gameLogic';

jest.mock('fs');
jest.mock('../src/titleScreen');
jest.mock('node:readline/promises');

const mockQuestions: Question[] = [
  { id: 1, question: 'What is 2+2?', correctAnswer: 1, answers: ['4', '3', '5'] },
  { id: 2, question: 'What is 3+3?', correctAnswer: 2, answers: ['5', '6', '7'] },
  { id: 3, question: 'What is 4+4?', correctAnswer: 3, answers: ['7', '9', '8'] },
  { id: 4, question: 'What is 5+5?', correctAnswer: 1, answers: ['10', '11', '9'] },
  { id: 5, question: 'What is 6+6?', correctAnswer: 2, answers: ['11', '12', '13'] },
  { id: 6, question: 'What is 7+7?', correctAnswer: 3, answers: ['13', '15', '14'] },
  { id: 7, question: 'What is 8+8?', correctAnswer: 1, answers: ['16', '15', '17'] }
];

describe('loadQuestions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should load and parse questions from JSON file', () => {
    const mockData = JSON.stringify({ questions: mockQuestions });
    (fs.readFileSync as jest.Mock).mockReturnValue(mockData);

    const result = loadQuestions();

    expect(fs.readFileSync).toHaveBeenCalledWith('./questions.json', 'utf8');
    expect(result).toEqual(mockQuestions);
    expect(result).toHaveLength(7);
  });

  it('should handle empty questions array', () => {
    const mockData = JSON.stringify({ questions: [] });
    (fs.readFileSync as jest.Mock).mockReturnValue(mockData);

    const result = loadQuestions();

    expect(result).toEqual([]);
    expect(result).toHaveLength(0);
  });

  it('should throw error for invalid JSON', () => {
    (fs.readFileSync as jest.Mock).mockReturnValue('invalid json');

    expect(() => loadQuestions()).toThrow();
  });
});

describe('getFiveRandomQuestions', () => {
  it('should return exactly 5 questions when array has more than 5', () => {
    const result = getFiveRandomQuestions([...mockQuestions]);

    expect(result).toHaveLength(5);
  });

  it('should return all questions when array has exactly 5', () => {
    const fiveQuestions = mockQuestions.slice(0, 5);
    const result = getFiveRandomQuestions([...fiveQuestions]);

    expect(result).toHaveLength(5);
  });

  it('should return all questions when array has fewer than 5', () => {
    const twoQuestions = mockQuestions.slice(0, 2);
    const result = getFiveRandomQuestions([...twoQuestions]);

    expect(result).toHaveLength(2);
  });

  it('should return questions from the original array', () => {
    const result = getFiveRandomQuestions([...mockQuestions]);

    result.forEach(question => {
      expect(mockQuestions).toContainEqual(question);
    });
  });

  it('should shuffle questions (randomness check)', () => {
    const results = new Set<string>();
    
    for (let i = 0; i < 10; i++) {
      const result = getFiveRandomQuestions([...mockQuestions]);
      const ids = result.map(q => q.id).sort().join(',');
      results.add(ids);
    }

    expect(results.size).toBeGreaterThan(1);
  });
});

describe('displayFinalResult', () => {
  let consoleLogSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
  });

  it('should display perfect score message when all answers are correct', () => {
    displayFinalResult(5, 5);

    const allOutput = consoleLogSpy.mock.calls.flat().join(' ');
    expect(allOutput).toContain('Perfect');
    expect(allOutput).toContain('5 out of 5');
  });

  it('should display good job message when score is at least 50%', () => {
    displayFinalResult(3, 5);

    const allOutput = consoleLogSpy.mock.calls.flat().join(' ');
    expect(allOutput).toContain('Good job');
    expect(allOutput).toContain('3 out of 5');
  });

  it('should display keep learning message when score is below 50%', () => {
    displayFinalResult(2, 5);

    const allOutput = consoleLogSpy.mock.calls.flat().join(' ');
    expect(allOutput).toContain('Keep learning');
    expect(allOutput).toContain('2 out of 5');
  });

  it('should display correct message for 0 correct answers', () => {
    displayFinalResult(0, 5);

    const allOutput = consoleLogSpy.mock.calls.flat().join(' ');
    expect(allOutput).toContain('Keep learning');
    expect(allOutput).toContain('0 out of 5');
  });

  it('should display separators', () => {
    displayFinalResult(3, 5);

    const allOutput = consoleLogSpy.mock.calls.flat().join(' ');
    expect(allOutput).toContain('='.repeat(50));
  });
});

describe('askQuestions', () => {
  let consoleLogSpy: jest.SpyInstance;
  let mockRl: any;

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    
    mockRl = {
      question: jest.fn(),
      close: jest.fn()
    };
    
    (readline.createInterface as jest.Mock).mockReturnValue(mockRl);
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
    jest.clearAllMocks();
  });

  it('should return correct count when all answers are correct', async () => {
    const testQuestions: Question[] = [
      { id: 1, question: 'Test 1?', correctAnswer: 1, answers: ['A', 'B', 'C'] },
      { id: 2, question: 'Test 2?', correctAnswer: 2, answers: ['X', 'Y', 'Z'] }
    ];

    mockRl.question.mockResolvedValueOnce('1').mockResolvedValueOnce('2');

    const result = await askQuestions(testQuestions);

    expect(result).toBe(2);
    expect(mockRl.close).toHaveBeenCalled();
  });

  it('should return correct count when some answers are wrong', async () => {
    const testQuestions: Question[] = [
      { id: 1, question: 'Test 1?', correctAnswer: 1, answers: ['A', 'B', 'C'] },
      { id: 2, question: 'Test 2?', correctAnswer: 2, answers: ['X', 'Y', 'Z'] }
    ];

    mockRl.question.mockResolvedValueOnce('1').mockResolvedValueOnce('1');

    const result = await askQuestions(testQuestions);

    expect(result).toBe(1);
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('✓ Correct!'));
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('✗ Wrong!'));
  });

  it('should handle invalid input and give second chance', async () => {
    const testQuestions: Question[] = [
      { id: 1, question: 'Test?', correctAnswer: 1, answers: ['A', 'B'] }
    ];

    mockRl.question.mockResolvedValueOnce('invalid').mockResolvedValueOnce('1');

    const result = await askQuestions(testQuestions);

    expect(result).toBe(1);
    expect(mockRl.question).toHaveBeenCalledTimes(2);
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('Invalid input'));
  });
});

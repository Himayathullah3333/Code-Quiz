const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: '3yqqwf5v',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-03-12',
  token: process.env.SANITY_AUTH_TOKEN, // You'll need to set this
});

const sampleQuestions = [
  {
    _type: 'questions',
    question: 'What is the output of console.log(typeof null)?',
    answers: ['null', 'undefined', 'object', 'boolean'],
    correctAnswer: 'object'
  },
  {
    _type: 'questions',
    question: 'Which method is used to add an element to the end of an array?',
    answers: ['push()', 'pop()', 'shift()', 'unshift()'],
    correctAnswer: 'push()'
  },
  {
    _type: 'questions',
    question: 'What does "=== " operator do in JavaScript?',
    answers: ['Assignment', 'Equality check', 'Strict equality check', 'Not equal'],
    correctAnswer: 'Strict equality check'
  },
  {
    _type: 'questions',
    question: 'What is the output of console.log(1 === true)?',
    answers: ['true', 'false', 'undefined', 'error'],
    correctAnswer: 'false'
  },
  {
    _type: 'questions',
    question: 'Which keyword is used to declare a constant in JavaScript?',
    answers: ['var', 'let', 'const', 'final'],
    correctAnswer: 'const'
  },
  {
    _type: 'questions',
    question: 'What is the correct way to create a function in JavaScript?',
    answers: ['function myFunc() {}', 'create myFunc() {}', 'def myFunc() {}', 'func myFunc() {}'],
    correctAnswer: 'function myFunc() {}'
  },
  {
    _type: 'questions',
    question: 'What does JSON stand for?',
    answers: ['JavaScript Object Notation', 'Java Standard Object Notation', 'JavaScript Online Notation', 'Java Script Object Network'],
    correctAnswer: 'JavaScript Object Notation'
  },
  {
    _type: 'questions',
    question: 'Which method converts a JSON string into a JavaScript object?',
    answers: ['JSON.parse()', 'JSON.stringify()', 'JSON.convert()', 'JSON.object()'],
    correctAnswer: 'JSON.parse()'
  },
  {
    _type: 'questions',
    question: 'What is the output of console.log(0.1 + 0.2 === 0.3)?',
    answers: ['true', 'false', 'undefined', 'NaN'],
    correctAnswer: 'false'
  },
  {
    _type: 'questions',
    question: 'Which loop is guaranteed to execute at least once?',
    answers: ['for loop', 'while loop', 'do-while loop', 'forEach loop'],
    correctAnswer: 'do-while loop'
  }
];

async function addQuestions() {
  try {
    console.log('Adding sample questions to Sanity...');
    
    for (const question of sampleQuestions) {
      const result = await client.create(question);
      console.log(`Added question: ${question.question}`);
    }
    
    console.log('All questions added successfully!');
  } catch (error) {
    console.error('Error adding questions:', error);
  }
}

addQuestions();
import userInteraction from "./userInteraction.js";
import Quiz from "./quiz.js";

const questions = [
  {
    question: "What is the capital of Spain",
    options: ["Berlin", "London", "Madrid"],
    answerIndex: 2,
  },
  {
    question: "What is the capital of Nigeria",
    options: ["Berlin", "Abuja", "Madrid"],
    answerIndex: 1,
  },
  {
    question: "What is the capital of Germany",
    options: ["Berlin", "London", "Madrid"],
    answerIndex: 0,
  },
];

const quiz = new Quiz(questions);
const ui = new userInteraction(quiz);

ui.displayCurrentQuestion()
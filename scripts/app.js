import userInteraction from "./userInteraction.js";
import Quiz from "./quiz.js";
// import { nextButtonEventHandler } from "./userInteraction.js";

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

const nextButton = document.getElementById('next')
const questionElement = document.getElementById("question");
// const timerElement = document.getElementById("timer");
const optionsElement = document.getElementById("options");
// next.addEventListener('click', nextButtonEventHandler(ui))

const nextButtonHandler = (ui) => {
  clearTimeout(ui.timer);
  if (ui.selectedOptionIndex !== null) {
    const correctIndex =
      ui.quiz.questions[ui.quiz.currentQuestionIndex].answerIndex;
    ui.showAnswer(correctIndex);
  }

  setTimeout(() => {
    ui.selectedOptionIndex = null;
    if (ui.quiz.getNextQuestion()) {
      ui.displayCurrentQuestion();
      if (
        ui.quiz.currentQuestionIndex ===
        ui.quiz.questions.length - 1
      ) {
        // submitButton.style.display = "block";
        // nextButton.style.display = "none";
        nextButton.innerHTML = "See total Score";
      }
    } else {
      ui.calculateScore();
      questionElement.textContent = `Your Score is ${score}`;
      optionsElement.innerHTML = "";
      // restartElement.style.display='block';
      ui.quiz.resetCurrentQuestion();
      score = 0;
      nextButton.style.display = "none";
    }
  }, 2000); //show correct answer for 2 seconds
  optionsElement
    .querySelectorAll("li")
    [
      ui.quiz.questions[ui.quiz.currentQuestionIndex].answerIndex
    ].classList.add("correct");
}

ui.displayCurrentQuestion()
nextButton.addEventListener('click', nextButtonHandler(ui))



// nextButton.addEventListener("click", (ui) => {
//   clearTimeout(this.timer);
//   if (selectedOptionIndex !== null) {
//     const correctIndex =
//       this.quiz.questions[this.quiz.currentQuestionIndex].answerIndex;
//     this.showAnswer(correctIndex);
//   }

//   setTimeout(() => {
//     this.selectedOptionIndex = null;
//     if (this.quiz.getNextQuestion()) {
//       this.displayCurrentQuestion();
//       if (
//         this.quiz.currentQuestionIndex ===
//         this.quiz.questions.length - 1
//       ) {
//         // submitButton.style.display = "block";
//         // nextButton.style.display = "none";
//         nextButton.innerHTML = "See total Score";
//       }
//     } else {
//       this.calculateScore();
//       questionElement.textContent = `Your Score is ${score}`;
//       optionsElement.innerHTML = "";
//       // restartElement.style.display='block';
//       this.quiz.resetCurrentQuestion();
//       score = 0;
//       nextButton.style.display = "none";
//     }
//   }, 2000); //show correct answer for 2 seconds
//   optionsElement
//     .querySelectorAll("li")
//     [
//       this.quiz.questions[this.quiz.currentQuestionIndex].answerIndex
//     ].classList.add("correct");
// });
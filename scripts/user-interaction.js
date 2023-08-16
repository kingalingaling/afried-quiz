const questionElement = document.getElementById("question");
const timerElement = document.getElementById("timer");
const optionsElement = document.getElementById("options");
const nextButton = document.getElementById("next");

let userAnswers = []; //store answers
let selectedOptionIndex = null;
// let score = 0;
// let timeLeft = 0;
// let timer;

export default class userInteraction {
  constructor(quiz) {
    this.quiz = quiz;
    this.selectedOptionIndex = null;
    this.timer = null;
    this.score = 0;
    this.userAnswers = userAnswers;
    this.timer = null;
    this.timeLeft = 0;
  }

  selectOption(optionIndex) {
    if (this.selectedOptionIndex !== null) {
      optionsElement
        .querySelectorAll("li")
        [this.selectedOptionIndex].classList.remove("selected");
    }

    this.selectedOptionIndex = optionIndex;
    optionsElement
      .querySelectorAll("li")
      [optionIndex].classList.add("selected");
    this.userAnswers[this.quiz.currentQuestionIndex] = optionIndex;
    this.quiz.selectOption(optionIndex);
    //   nextButton.style.display = "block";

    optionsElement.querySelectorAll("li").forEach((li) => {
      li.removeEventListener("click", this.selectOption);
    });
  }

  showAnswer(answerIndex) {
    optionsElement.querySelectorAll("li").forEach((li, index) => {
      if (index === answerIndex) {
        li.classList.add("correct");
      } else {
        li.classList.add("wrong");
      }
    });
  }

  calculateScore() {
    this.score = 0;
    this.userAnswers.forEach((userAnswerIndex, questionIndex) => {
      if (userAnswerIndex === this.quiz.questions[questionIndex].answerIndex) {
        this.score++;
      }
    });
  }

  updateTimer() {
    timerElement.textContent = this.timeLeft;
  }

  startTimer() {
    this.updateTimer();
    this.timer = setInterval(() => {
      this.timeLeft--;
      this.updateTimer();
      if (this.timeLeft <= 0) {
        clearInterval(this.timer);
        //when timeup, move to next question
        if (this.quiz.getNextQuestion()) {
          this.displayCurrentQuestion();
        } else {
          this.calculateScore();
          questionElement.textContent = `Time up!!! \n Your Score is ${this.score}`;
          optionsElement.innerHTML = "";
          nextButton.style.display = "none";
        //   submitButton.style.display = "block";
        }
      }
    }, 1000); //update every second
  }

  displayCurrentQuestion() {
    this.timeLeft = 30; //intialize timer for each question
    this.updateTimer();

    const currentQuestion = this.quiz.getCurrentQuestion();
    const currentOptions = this.quiz.getCurrentOptions();

    questionElement.textContent = currentQuestion;
    optionsElement.innerHTML = "";

    currentOptions.forEach((option, index) => {
      const li = document.createElement("li");
      li.textContent = option;
      li.addEventListener("click", () => {
        this.selectOption(index);
      });
      optionsElement.appendChild(li);
    });

    this.startTimer();

    optionsElement.querySelectorAll("li").forEach((li, index) => {
      li.classList.remove("selected");
      li.addEventListener("click", () => this.selectOption(index));
    });
  }

  nextButtonHandler() {
    nextButton.addEventListener("click", () => {
      clearTimeout(this.timer);
      if (this.selectedOptionIndex !== null) {
        const correctIndex = this.quiz.questions[this.quiz.currentQuestionIndex].answerIndex;
        this.showAnswer(correctIndex);
      }

      setTimeout(() => {
        this.selectedOptionIndex = null;
        if (this.quiz.getNextQuestion()) {
          this.displayCurrentQuestion();
          if (this.quiz.currentQuestionIndex === this.quiz.questions.length - 1) {
            // submitButton.style.display = "block";
            // nextButton.style.display = "none";
            nextButton.innerHTML = "See total Score";
          }
        } else {
          this.calculateScore();
          questionElement.textContent = `Your Score is ${this.score}`;
          optionsElement.innerHTML = "";
          nextButton.style.display = "none";
        }
      }, 2000); //show correct answer for 2 seconds
      optionsElement
        .querySelectorAll("li")
        [this.quiz.questions[this.quiz.currentQuestionIndex].answerIndex].classList.add(
          "correct"
        );
    });
  }
}

// export const nextHandle = userInteraction.nextButtonHandler()

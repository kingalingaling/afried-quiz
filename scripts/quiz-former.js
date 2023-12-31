class Quiz {
  constructor(questions) {
    this.questions = questions;
    this.currentQuestionIndex = 0;
  }

  getCurrentQuestion() {
    return this.questions[this.currentQuestionIndex].question;
  }

  getCurrentOptions() {
    return this.questions[this.currentQuestionIndex].options;
  }

  getCurrentAnswer() {
    return this.questions[this.currentQuestionIndex].answer;
  }

  selectOption(optionIndex) {
    //handle selected option
    const selectOption =
      this.questions[this.currentQuestionIndex].options[optionIndex];
    //scoring
  }

  getNextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      return true;
    } else {
      return false;
    }
  }
}

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

const questionElement = document.getElementById("question");
const timerElement = document.getElementById("timer");
const optionsElement = document.getElementById("options");
const nextButton = document.getElementById("next");

//intialize quiz
const quiz = new Quiz(questions);
let userAnswers = []; //store answers
let selectedOptionIndex = null;
let score = 0;
let timeLeft = 0;
let timer;

const displayCurrentQuestion = () => {
  timeLeft = 30; //intialize timer for each question
  updateTimer();

  const currentQuestion = quiz.getCurrentQuestion();
  const currentOptions = quiz.getCurrentOptions();

  questionElement.textContent = currentQuestion;
  optionsElement.innerHTML = "";

  currentOptions.forEach((option, index) => {
    const li = document.createElement("li");
    li.textContent = option;
    li.addEventListener("click", () => {
      selectOption(index);
    });
    optionsElement.appendChild(li);
  });

  startTimer();

  optionsElement.querySelectorAll("li").forEach((li, index) => {
    li.classList.remove("selected");
    li.addEventListener("click", () => selectOption(index));
  });
};



const selectOption = (optionIndex) => {
  if (selectedOptionIndex !== null) {
    optionsElement
      .querySelectorAll("li")
      [selectedOptionIndex].classList.remove("selected");
  }

  selectedOptionIndex = optionIndex;
  optionsElement.querySelectorAll("li")[optionIndex].classList.add("selected");
  userAnswers[quiz.currentQuestionIndex] = optionIndex;
  quiz.selectOption(optionIndex);
  //   nextButton.style.display = "block";

  optionsElement.querySelectorAll("li").forEach((li) => {
    li.removeEventListener("click", selectOption);
  });
};

const showAnswer = (answerIndex) => {
  optionsElement.querySelectorAll("li").forEach((li, index) => {
    if (index === answerIndex) {
      li.classList.add("correct");
    } else {
      li.classList.add("wrong");
    }
  });
};

nextButton.addEventListener("click", () => {
  clearTimeout(timer);
  if (selectedOptionIndex !== null) {
    const correctIndex = questions[quiz.currentQuestionIndex].answerIndex;
    showAnswer(correctIndex);
  }

  setTimeout(() => {
    selectedOptionIndex = null;
    if (quiz.getNextQuestion()) {
      displayCurrentQuestion();
      if (quiz.currentQuestionIndex === quiz.questions.length - 1) {
        // submitButton.style.display = "block";
        // nextButton.style.display = "none";
        nextButton.innerHTML = "See total Score";
      }
    } else {
      calculateScore();
      questionElement.textContent = `Your Score is ${score}`;
      optionsElement.innerHTML = "";
      nextButton.style.display = "none";
    }
  }, 2000); //show correct answer for 2 seconds
  optionsElement
    .querySelectorAll("li")
    [questions[quiz.currentQuestionIndex].answerIndex].classList.add("correct");
});

// const submitQuiz = () => {
//   clearTimeout(timer);
//   calculateScore();
//   questionElement.textContent = `Your Score is ${score}`;
//   optionsElement.innerHTML = "";
//   submitButton.style.display = "none";
// };

const calculateScore = () => {
  score = 0;
  userAnswers.forEach((userAnswerIndex, questionIndex) => {
    if (userAnswerIndex === questions[questionIndex].answerIndex) {
      score++;
    }
  });
};

const updateTimer = () => {
  timerElement.textContent = timeLeft;
};

const startTimer = () => {
  updateTimer();
  timer = setInterval(() => {
    timeLeft--;
    updateTimer();
    if (timeLeft <= 0) {
      clearInterval(timer);
      //when timeup, move to next question
      if (quiz.getNextQuestion()) {
        displayCurrentQuestion();
      } else {
        calculateScore();
        questionElement.textContent = `Time up!!! \n Your Score is ${score}`;
        optionsElement.innerHTML = "";
        nextButton.style.display = "none";
        submitButton.style.display = "block";
      }
    }
  }, 1000); //update every second
};

displayCurrentQuestion();

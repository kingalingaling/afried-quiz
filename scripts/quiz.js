export default class Quiz {
  constructor(questions) {
    this.questions = questions;
    this.currentQuestionIndex = 0;
  }

  getCurrentQuestion() {
    return this.questions[this.currentQuestionIndex].question;
  }

  resetCurrentQuestion() {
    this.currentQuestionIndex = 0
  }

  getCurrentOptions() {
    return this.questions[this.currentQuestionIndex].options;
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

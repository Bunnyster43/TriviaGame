//* time code
function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
            alert("game over")
        }
    }, 1000);
}

window.onload = function () {
    var oneMinutesThirty = 90 * 1,
        display = document.querySelector('#time');
        startTimer(oneMinutesThirty, display);
};

//* quiz code
(function() {
  function buildQuiz() {

    const output = [];

    myQuestions.forEach((currentQuestion, questionNumber) => {

      const answers = [];

      for (letter in currentQuestion.answers) {
        answers.push(
          `<label>
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
          </label>`
        );
      }

      output.push(
        `<div class="question"> ${currentQuestion.question} </div>
        <div class="answers"> ${answers.join("")} </div>`
      );
    });

    quizContainer.innerHTML = output.join("");
  }

  function showResults() {

    const answerContainers = quizContainer.querySelectorAll(".answers");

    let numCorrect = 0;

    myQuestions.forEach((currentQuestion, questionNumber) => {

      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      if (userAnswer === currentQuestion.correctAnswer) {

        numCorrect++;

        answerContainers[questionNumber].style.color = "lightgreen";
      } else {

        answerContainers[questionNumber].style.color = "red";
      }
    });

    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");
  const myQuestions = [
    {
      question: "What year did Jurassic Park come out?",
      answers: {
        a: "1993",
        b: "1998",
        c: "1990",
        d: "1995",
      },
      correctAnswer: "a"
    },
    {
      question: "Who starred in Titanic?",
      answers: {
        a: "Johnny Depp",
        b: "Jet Li",
        c: "Robert Downey Jr.",
        d: "Leonardo DiCaprio",
      },
      correctAnswer: "d"
    },
    {
      question: "Who directed The Matrix?",
      answers: {
        a: "Cameron",
        b: "Disney",
        c: "Wachowski",
        d: "Columbus",
      },
      correctAnswer: "c"
    },
    {
      question: "The Silence Of The Lambs Is about:",
      answers: {
        a: "Hannibal ",
        b: "Gump",
        c: "Neo",
        d: "Sparta",
      },
      correctAnswer: "a"
    },
    {
      question: "Groundhog Day is:",
      answers: {
        a: "good movie",
        b: "bad movie",
        c: "ok movie",
        d: "great movie",
      },
      correctAnswer: "d"
    },

  ];

  buildQuiz();

  submitButton.addEventListener("click", showResults);
})();

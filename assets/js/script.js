// Initialize variables
var welcome = document.querySelector("#welcome");
var quiz = document.querySelector("#quiz");
var highscores = document.querySelector("#highscores");
var timer = document.querySelector("#time");
var startBtn = document.querySelector("#startBtn");
var scoreBtn = document.querySelector("#scoreBtn");
var returnBtn = document.querySelector("#return");
var clearBtn = document.querySelector("#clearBtn");
var answers = document.querySelector("#answers");
var button2 = document.querySelectorAll(".button2");
var correct = document.querySelector("#correct");
var wrong = document.querySelector("#wrong");
var question = document.querySelector("#question");
var scores = [];

var question1 = {
  Q: "What is the correct way to declare a JavaScript variable?",
  A: "variable myVariable",
  B: "var myVariable",
  C: "let myVariable",
  D: "const myVariable",
  answer: "B",
};
var question2 = {
  Q: "What is the result of the following expression: 10 % 3?",
  A: "1",
  B: "2",
  C: "3",
  D: "4",
  answer: "A",
};
var question3 = {
  Q: "Which keyword is used to declare a function in JavaScript?",
  A: "function",
  B: "method",
  C: "procedure",
  D: "def",
  answer: "A",
};
var question4 = {
  Q: "What is the output of the following code?\nconsole.log(typeof([]));",
  A: "array",
  B: "object",
  C: "undefined",
  D: "string",
  answer: "B",
};
var questions = [question1, question2, question3, question4];
var currentQuestionIndex = 0;
var timeLeft = 60;
var score = 0;
var timerInterval;

function startQuiz() {
  // Reset variables
  currentQuestionIndex = 0;
  timeLeft = 60;
  score = 0;
  scores = [];
  resetDisplay();

  // Display quiz section and hide welcome section
  quiz.style.display = "block";
  welcome.style.display = "none";

  // Start timer
  timerInterval = setInterval(function () {
    timeLeft--;
    timer.textContent = "Time: " + timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      endQuiz();
    }
  }, 1000);

  displayQuestion();
}

function endQuiz() {

  var initials = prompt("Enter your initials:");
  var storedScores = localStorage.getItem("scores");

  scores = storedScores ? JSON.parse(storedScores) : [];

  // Store current score with initials
  scores.push({ initials: initials, score: score });

  // Store updated scores in local storage
  localStorage.setItem("scores", JSON.stringify(scores));

  // Reset variables
  currentQuestionIndex = 0;
  timeLeft = 60;
  score = 0;

  // Hide quiz section and display highscores section
  quiz.style.display = "none";
  highscores.style.display = "block";

  clearInterval(timerInterval);
  displayHighscores();
}

function resetDisplay() {
  // Hide all sections except welcome
  quiz.style.display = "none";
  highscores.style.display = "none";

  // Reset timer display
  timer.textContent = "Time: 0";

  // Reset question and answer displays
  question.textContent = "";
  for (var i = 0; i < button2.length; i++) {
    button2[i].textContent = "";
  }

  correct.style.display = "none";
  wrong.style.display = "none";
}

function displayQuestion() {
  var currentQuestion = questions[currentQuestionIndex];

  question.textContent = currentQuestion.Q;
  button2[0].textContent = currentQuestion.A;
  button2[1].textContent = currentQuestion.B;
  button2[2].textContent = currentQuestion.C;
  button2[3].textContent = currentQuestion.D;
}

function displayHighscores() {
  var storedScores = localStorage.getItem("scores");

  if (storedScores) {
    scores = JSON.parse(storedScores);
  }
  // Sort scores in descending order
  scores.sort(function (a, b) {
    return b.score - a.score;
  });
  // Clear previous highscores display
  var ol = document.querySelector("#highscoreList");
  ol.innerHTML = "";
  // Display highscores
  for (var i = 0; i < scores.length; i++) {
    var li = document.createElement("li");
    li.textContent = scores[i].initials + " - " + scores[i].score;
    ol.appendChild(li);
  }
}

// Check answer function
function checkAnswer(event) {
  var selectedAnswer = event.target.id;
  var currentQuestion = questions[currentQuestionIndex];

  if (selectedAnswer === currentQuestion.answer) {
    // Display correct feedback
    correct.style.display = "block";
    wrong.style.display = "none";
    score += 10;
  } else {
    // Display wrong feedback
    wrong.style.display = "block";
    correct.style.display = "none";
    score -= 10;
    if (score < 0) {
      score = 0;
    }
  }

  currentQuestionIndex++;
  // Check if all questions have been answered
  if (currentQuestionIndex >= questions.length) {
    endQuiz();
  } else {
    displayQuestion();
  }
}

// Event listeners
startBtn.addEventListener("click", startQuiz);
scoreBtn.addEventListener("click", function () {
  resetDisplay();
  highscores.style.display = "block";
  startBtn.style.display = "none";
  welcome.style.display = "none";
});
returnBtn.addEventListener("click", function () {
  resetDisplay();
  welcome.style.display = "flex";
  startBtn.style.display = "flex";
});
clearBtn.addEventListener("click", function () {
  localStorage.clear();
  displayHighscores();
});
answers.addEventListener("click", checkAnswer);
// Initialize variables
var welcome = document.querySelector("#welcome");
var quiz = document.querySelector("#quiz");
var highscores = document.querySelector("#highscores");
var timer = document.querySelector("#time");
var startBtn = document.querySelector("#startBtn");
var scoreBtn = document.querySelector("#scoreBtn");
var returnBtn = document.querySelector("#return");
var answers = document.querySelector("#answers");
var button2 = document.querySelectorAll(".button2");
var correct = document.querySelector("#correct");
var wrong = document.querySelector("#wrong");
var question = document.querySelector("#question");
var scores = [];

var question1 = {
  Q: "Question 1",
  A: "1",
  B: "1",
  C: "1",
  D: "1",
  answer: "B",
};
var question2 = {
  Q: "Question 2",
  A: "2",
  B: "2",
  C: "2",
  D: "2",
  answer: "B",
};
var question3 = {
  Q: "Question 3",
  A: "3",
  B: "3",
  C: "3",
  D: "3",
  answer: "B",
};
var question4 = {
  Q: "Question 4",
  A: "4",
  B: "4",
  C: "4",
  D: "4",
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

  // Display first question
  displayQuestion();
}

function endQuiz() {
  clearInterval(timerInterval);

  // Prompt user for initials
  var initials = prompt("Enter your initials:");

  // Store score with initials
  scores.push({ initials: initials, score: score });

  // Store scores in local storage
  localStorage.setItem("scores", JSON.stringify(scores));

  // Hide quiz section and display highscores section
  quiz.style.display = "none";
  highscores.style.display = "block";

  // Display highscores
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

  // Hide feedback displays
  correct.style.display = "none";
  wrong.style.display = "none";
}

function displayQuestion() {
  var currentQuestion = questions[currentQuestionIndex];

  // Display current question and answers
  question.textContent = currentQuestion.Q;
  button2[0].textContent = currentQuestion.A;
  button2[1].textContent = currentQuestion.B;
  button2[2].textContent = currentQuestion.C;
  button2[3].textContent = currentQuestion.D;
}

function displayHighscores() {
  var storedScores = localStorage.getItem("scores");

  // Parse stored scores from local storage
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

function checkAnswer(event) {
  var selectedAnswer = event.target.id;
  var currentQuestion = questions[currentQuestionIndex];

  // Check if the selected answer is correct
  if (selectedAnswer === currentQuestion.answer) {
    // Display correct feedback
    correct.style.display = "block";
    // Increase score by 10 points
    score += 10;
  } else {
    // Display wrong feedback
    wrong.style.display = "block";
    // Decrease score by 10 points
    score -= 10;
    if (score < 0) {
      score = 0;
    }
  }

  // Move to the next question
  currentQuestionIndex++;

  // Check if all questions have been answered
  if (currentQuestionIndex >= questions.length) {
    endQuiz();
  } else {
    // Display the next question
    displayQuestion();
  }
}

// Event listeners
startBtn.addEventListener("click", startQuiz);
scoreBtn.addEventListener("click", function () {
  resetDisplay();
  highscores.style.display = "block";
});
returnBtn.addEventListener("click", function () {
  resetDisplay();
  welcome.style.display = "block";
});
answers.addEventListener("click", checkAnswer);
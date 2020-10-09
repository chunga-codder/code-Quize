var quizQuestions = document.getElementById("quiz-questions");
var timer = document.getElementById("timer");
var btnStart = document.getElementById("btn-start");
var timecounter = document.getElementById("timecounter");
var titleitem = document.getElementById("title-item");
var nextQuestions;
var questionanswers = document.getElementById("question-answers");
var myScore = document.getElementById("score");
var btnScore = document.getElementById("btnScore");
var currentindex = 0;
var score = 0;
var count = 100;
var alert = document.getElementById("alert");
var info = document.getElementById("info");
var addscore = document.getElementById("addscore");
var submitresult = document.getElementById("submitresult");
var allScores = [];
//using the JSON.parse to get my results stored as string in my local storage
var storedScores = JSON.parse(localStorage.getItem("userData"));
// my questions all stored as an object with answers in arays
var questions = [
  {
    title: "what is the full meaning of CSS?",
    choices: [
      "cascading style sheet",
      "cascading style system",
      "cast style sheet",
      "non",
    ],
    answer: "cascading style sheet",
  },
  {
    title: "an if/else statement is enclosed within?",
    choices: ["quotes", "Curly brackets", "parentheses", "square brackets"],
    answer: "parentheses",
  },
  {
    title: "what can objects take in ?",
    choices: ["numbers and strings", "non ", "booleances", "all of the above"],
    answer: "all of the above",
  },
  {
    title:
      "what is the function which is used to be able to store an array in our local storage? ",
    choices: ["JSON.stringify", "JASON.parse", "event.default", "non"],
    answer: "JSON.stringify",
  },
  {
    title:
      "what is the function which is used to retrive stored data in our local storage?",
    choices: ["JSON.stringify", "JASON.parse", "event.default", "non"],
    answer: "JASON.parse",
  },
  {
    title: "what programming language is set as the skeletton of our web apps?",
    choices: ["html", "java", "javascript", "css", "non"],
    answer: "html",
  },
];
btnStart.addEventListener("click", starQuiz);
function starQuiz() {
  if (storedScores !== null) {
    allScores = storedScores;
  }
  btnStart.classList.add("d-none");
  timecounter.classList.remove("d-none");
  quizQuestions.classList.remove("d-none");
  nextQuestions = questions[currentindex];
  console.log(nextQuestions.title);

  displayQuestion(nextQuestions);

  gametime();
}
btnScore.addEventListener("click", function () {
  let name = document.getElementById("inputScore").value;
  scorePage(name, count);
});
// setting my time 

function gametime() {
  var timeinterval = setInterval(function () {
    timer.innerText = count;
    count--;
  }, 1000);
}

function scorePage(a, b) {
  var userData = {
    inits: a,
    userScore: b,
  };
  allScores.push(userData);

  localStorage.setItem("userData", JSON.stringify(allScores));
  location.href = "storedscore.js";

// this is my javascript code to run at the back to store highscore

//   var storedScores = JSON.parse(localStorage.getItem("userData"));
// var highScoresArea = document.querySelector("#highScoresList");
// var backBtn = document.querySelector("#backButton");
// var clearBtn = document.querySelector("#clearScores");


// function displayScores() {
//     if (storedScores !== null) {
//         var scoreList = document.createElement("ol");
//         scoreList.className = "scoreListClass";
//         for (var i = 0; i < storedScores.length; i++) {
//             var initials = storedScores[i].inits;
//             var scores = storedScores[i].userScore
//             var scoreEntry = document.createElement("li");
//             scoreEntry.innerHTML = initials + " - " + scores;
//             scoreList.appendChild(scoreEntry);
//         }
//         highScoresArea.appendChild(scoreList);
//     }
// };

// displayScores();

// backBtn.addEventListener("click", function () {
//     location.href = "index.html";
// });

// clearBtn.addEventListener("click", function () {
//     highScoresArea.innerHTML = "";
//     window.localStorage.clear();

// });
 }

function displayQuestion(question) {
  titleitem.innerText = question.title;
  question.choices.forEach((element) => {
    var button = document.createElement("button");
    button.className = "btn-primary btn-block text-left";
    button.innerText = element;
  
    questionanswers.appendChild(button);
    button.addEventListener("click", displaynextQuestion);
  });
}

function displaynextQuestion(e) {
  currentindex++;
  if (currentindex < questions.length) {
    correction(e.target.innerText == nextQuestions.answer);
    questionanswers.innerHTML = "";
    if (currentindex < questions.length) {
      nextQuestions = questions[currentindex];
      displayQuestion(nextQuestions);
    } else {
      currentindex = 0;
      displayQuestion(nextQuestions);
    }
  } else {
    console.log("endgame");
    endgame();
  }
}
function correction(response) {
  if (response) {
    alert.innerText = "Good";
    console.log("Good");
  } else {
    alert.innerText = "Wrong";
    count = count - 15;
    timer.innerHTML = count;
    console.log("Wrong");
  }
  setTimeout(function () {
    alert.innerText = "";
  }, 1000);
}
function endgame() {
 btnStart.classList.add("d-none")
  myScore.innaText = count;
  addscore.classList.remove("d-none");
  timecounter.classList.add("d-none");
  quizQuestions.classList.add("d-none");
  addscore.classList.remove("d-none");
}
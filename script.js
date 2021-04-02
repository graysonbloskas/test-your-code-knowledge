// creating global variables 
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timeID;
var userInitialsArray = [];

// this variable is selecting the start class within my html, and setting it equal to my start button.
var startQBtn = document.querySelector('#startTest');

// these variables select are selecting the questions, options, and time elements found in my HTML.
var questionsEl = document.querySelector("#questions");
var questionsOptions = document.querySelector("#options");
var timerEl = document.querySelector("#time");
var interval;

window.onload = function () {
    setPageTimer();
}
// creates a new function for startQuiz. setAttribute method is setting a new class called hidden to the startScreen Element. The removeAttribute method is removing the attribute "class" from the questionsElement.

function startQuiz() {
    var startScreen = document.querySelector('#start_screen');
    startScreen.setAttribute('class', "hidden");
    toggleDomEl(questionsEl, 'class', 'hidden', false);

    getCurrentQuestion();
    counter();
}
startQBtn.onclick = startQuiz;

// The onclick method will run the startQuiz() function upon clicking the start button. 
function getCurrentQuestion() {
    var currentQuestion = questions[currentQuestionIndex];
    var titleEl = document.querySelector('#question-title');
    titleEl.textContent = currentQuestion.title;
    for (var i = 0; i < currentQuestion.options.length; i++) {
        var questionBtn = document.createElement("button");
        toggleDomEl(questionBtn, 'class', 'choice', true);
        toggleDomEl(questionBtn, 'value', i, true);
        questionBtn.addEventListener('click', answerChoice);
        questionBtn.textContent = i + 1 + "." + currentQuestion.options[i];
        questionsOptions.appendChild(questionBtn);
    }
}

function answerChoice() {
    var question = questions[currentQuestionIndex];
    // + turns the string into a number, so that we can compare the user choice and the correct answer. 
    if (+this.value === question.answerIndex) {
        alert("Correct!");

    } else {
        alert("WRONG");
        timeDecrement();
    }
    var classList = questions[currentQuestionIndex];
    var options = classList.options;
    removeEl(options);

    currentQuestionIndex++;
    if (currentQuestionIndex === questions.length) {
        var questEl = document.querySelector('#questions');
        var endPageEl = document.querySelector('#end-page');
        toggleDomEl(questEl, 'class', 'hidden', true);
        toggleDomEl(endPageEl, 'class', 'hidden', false);
        stopTimer(interval);
        setScore();
        return;
    }
    getCurrentQuestion();
}

function toggleDomEl(el, type, className, setAttr) {
    if (!el || !type || !className) {
        return;
    }
    if (setAttr) {
        el.setAttribute(type, className);
    } else if (!setAttr) {
        el.classList.remove(className);
    }
}

function removeEl(options) {
    if (!options) {
        return;
    }
    for (var i = 0; i < options.length; i++) {
        var el = document.querySelector('.choice');
        el.remove();
    }
}

function saveScore(event) {
    event.preventDefault();
    var nameField = document.querySelector("#name-field");
    var scoreField = document.querySelector('#timer-time');
    var value = nameField.value;
    var user = {
        userInitials: value,
        userScore: scoreField.innerHTML || 0
    };
    var currentUsers = window.localStorage.getItem('userInitials');
    var _currUsers = currentUsers && JSON.parse(currentUsers) || [];
    userInitialsArray = [..._currUsers, user];
    var userInitialString = JSON.stringify(userInitialsArray);
    window.localStorage.setItem('userInitials', userInitialString);
    window.location.href = "highscores.html";
}

function counter() {
    interval = setInterval(function () {
        var newTime = time - 1;
        time = newTime;
        setPageTimer();
        if (time <= 0) {
           stopTimer(interval);
            return;
        }
    }, 1000);
}

function setPageTimer() {
    var timerTime = document.querySelector('#timer-time');
    timerTime.textContent = time;
}

function timeDecrement() {
    var wrongAnswer = 15;
    time = time - wrongAnswer;
    return time;
    
}
function stopTimer(_int) {
    setPageTimer();
    return clearInterval(_int);
}

function setScore() {
    var finalScore = document.querySelector('#final-score');
    finalScore.textContent = time;
    
}
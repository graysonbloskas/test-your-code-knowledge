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
// the toggle dom element function toggles classes on and off the dom
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
// This function is receiving the answer input by the user, comparing it to the answerIndex in the questions.js, and deciding if it is correct. it then alerts the user if right or wrong. 
function answerChoice() {
    var question = questions[currentQuestionIndex];
    // + turns the string into a number, so that we can compare the user choice and the correct answer. 
    if (+this.value === question.answerIndex) {
        alert("Correct!");
        // this alerts the user if wrong, and calls the decrements the timer function
    } else {
        alert("WRONG");
        timeDecrement();
    }
    // this finds the options of the current question to remove them once a user has moved on. 
    var classList = questions[currentQuestionIndex];
    var options = classList.options;
    removeEl(options);
// this increments the current questions index, and if the questions in the current index is the last of the array, we are hiding the questions and displaying the end page. Also stops timer and declaring the score. 
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
// toggle dom element function, setting and removing class attributes. 
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
// this function removes the option buttons from the dom. 
function removeEl(options) {
    if (!options) {
        return;
    }
    for (var i = 0; i < options.length; i++) {
        var el = document.querySelector('.choice');
        el.remove();
    }
}
// this function is, upon user saving score, dumps the user entry into local storage, to then be pulled by the highscores page. 
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
    // Spread operator. It takes current users, if any, and copies them into the new array. 
    userInitialsArray = [..._currUsers, user];
    var userInitialString = JSON.stringify(userInitialsArray);
    window.localStorage.setItem('userInitials', userInitialString);
    window.location.href = "highscores.html";
}
// this function is controlling the timer. it sets a newTime every second. 
function counter() {
    interval = setInterval(function () {
        var newTime = time - 1;
        time = newTime;
        setPageTimer();
        // if clock hits 0, the interval stops. 
        if (time <= 0) {
           stopTimer(interval);
            return;
        }
    }, 1000);
}
// sets the timer in the dom.
function setPageTimer() {
    var timerTime = document.querySelector('#timer-time');
    timerTime.textContent = time;
}
// decrements the time by 15 seconds 
function timeDecrement() {
    var wrongAnswer = 15;
    time = time - wrongAnswer;
    return time;
    
}
// this stops the timer if the user finishes the quiz, or if the timer hits 0. 
function stopTimer(_int) {
    setPageTimer();
    return clearInterval(_int);
}
// this sets the final score in the dom. 
function setScore() {
    var finalScore = document.querySelector('#final-score');
    finalScore.textContent = time;
    
}
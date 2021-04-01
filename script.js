// creating global variables 
var currentQuestionIndex = 0;
var time = questions.length * 15
var timeID;
// this variable is selecting the start class within my html, and setting it equal to my start button.
var startBtn = document.querySelector('#startTest');
// questionBtn dom element 

// these variables select are selecting the questions, options, and time elements found in my HTML.
var questionsEl = document.querySelector("#questions");
var questionsOptions = document.querySelector("#options");
var timerEl = document.querySelector("#time");

// creates a new function for startQuiz. setAttribute method is setting a new class called hidden to the startScreen Element. The removeAttribute method is removing the attribute "class" from the questionsElement.

function startQuiz() {
    var startScreen = document.querySelector('#start_screen');
    startScreen.setAttribute('class', "hidden");
    toggleDomEl(questionsEl, 'class', 'hidden', false);

    getCurrentQuestion();
}
startBtn.onclick = startQuiz;
console.log(questions);
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

    console.log(this.value, question.answerIndex);
    console.log(typeof this.value, typeof question.answerIndex);
    // + turns the string into a number, so that we can compare the user choice and the correct answer. 
    if (+this.value === question.answerIndex) {
        alert("Correct!");

    } else {
        alert("WRONG");
    }
    var classList = questions[currentQuestionIndex];
    var options = classList.options;
    removeEl(options);

    currentQuestionIndex++;

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

function submit() {
    var nameField = document.querySelector("#name-field");
    var value = nameField.value;
    console.log("I submit", value);
}
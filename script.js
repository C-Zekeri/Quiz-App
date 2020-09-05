const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('btn'));
const counterText = document.getElementById('counter');
const scoreText = document.getElementById('score');
const endbutton = document.querySelector('.end-btn');
const nextbutton = document.querySelector('.next-btn');
const correct_score = 10;
const max_questions = 5;
const max_score = 50;

let score = 0;
let counter = 0;
let AvailableQuestions = [];
let currentQuestion = {};
let AcceptingAnswers = false;

const start = document.querySelector('.start-btn');
start.addEventListener('click', StartGame);

const next = document.querySelector('.next-btn');
next.addEventListener('click', setNextQuestion);

const restart = document.querySelector('#restart');
restart.addEventListener('click', restartGame);


let questions = [
    {
        question: "What is the capital of Rivers?",
        choice1: "Edo",
        choice2: "Warri",
        choice3: "Benin",
        choice4: "Port-Harcourt",
        answer: 4
    },
    {
        question: "What is the capital of Osun?",
        choice1: "Ibadan",
        choice2: "Akure",
        choice3: "Oshogbo",
        choice4: "Ife",
        answer: 3
    },
    {
        question: "What is the capital of Akwa-Ibom?",
        choice1: "Awka",
        choice2: "Abia",
        choice3: "Uyo",
        choice4: "Umuahia",
        answer: 3
    },
    {
        question: "What is the capital of Kogi?",
        choice1: "Kaba",
        choice2: "Lokoja",
        choice3: "Zaria",
        choice4: "Ankpa",
        answer: 2
    },
    {
        question: "What is the capital of Kaduna?",
        choice1: "Kaduna",
        choice2: "Lafia",
        choice3: "Zaria",
        choice4: "Gwarinpa",
        answer: 1
    },
    {
        question: "What is the capital of Taraba?",
        choice1: "Gusau",
        choice2: "Jalingo",
        choice3: "Dutse",
        choice4: "Zamfara",
        answer: 2
    }

];
AvailableQuestions = [...questions];

function StartGame() {
    let startpage = document.getElementById('start-display');
    let questionContainer = document.getElementById('qstn-container');
    startpage.classList.add('hide');
    questionContainer.classList.remove('hide');
    setNextQuestion();
}

function setNextQuestion() {
    const questionIndex = Math.floor(Math.random() * AvailableQuestions.length);
    currentQuestion = AvailableQuestions[questionIndex];
    counter++;
    counterText.innerText = counter + "/" + max_questions

    if (AvailableQuestions.length === 0 || counter >= (max_questions)) {
        nextbutton.classList.add('hide');
        endbutton.classList.remove('hide');
        endbutton.addEventListener('click', EndGame);
    }

    //input question and options from  array
    question.innerText = currentQuestion.question;
    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion["choice" + number];
        choice.style.backgroundColor = " rgb(234, 240, 234)";
        choice.style.color = " black"
    })
    AcceptingAnswers = true;
    nextbutton.disabled = true;
    endbutton.disabled = true;

    //show feedback for correct answer
    choices.forEach(choice => {
        choice.addEventListener('click', e => {
            if (!AcceptingAnswers) {
                nextbutton.disabled = false;
                endbutton.disabled = false;
                return;
            }

            AcceptingAnswers = false;

            const selectedChoice = e.target;
            const selectedAnswer = selectedChoice.dataset['number'];
            let answerIndex = currentQuestion.answer;
            let correctAnswer = choices[answerIndex - 1];

            const classToApply =
                selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

            if (classToApply === "correct") {
                incrementScore(correct_score);
                selectedChoice.style.backgroundColor = "green";
                selectedChoice.style.color = "white";
            }
            else {
                selectedChoice.style.backgroundColor = "red";
                selectedChoice.style.color = "white";
                correctAnswer.style.backgroundColor = "green";
                correctAnswer.style.color = "white";
            }
        })
    })

    //remove used questions from array
    AvailableQuestions.splice(questionIndex, 1);
}

//increment score
function incrementScore(num) {
    score += num;
    scoreText.innerText = score;
}

function EndGame() {
    const endpage = document.getElementById('end-display');
    const questionContainer = document.getElementById('qstn-container');
    questionContainer.classList.add('hide');
    endpage.classList.remove('hide');
    let finalScore = document.getElementById('final-score');
    finalScore.innerText = score + "/" + max_score;
}

function restartGame() {
    let endpage = document.getElementById('end-display');
    let questionContainer = document.getElementById('qstn-container');
    endpage.classList.add('hide');
    questionContainer.classList.remove('hide');
    endbutton.classList.add('hide');
    nextbutton.classList.remove('hide');
    counter = 0;
    score = 0;
    scoreText.innerText = 0;
    AvailableQuestions = [...questions];
    setNextQuestion();
}

//global variables
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

//event listeners for buttons
const start = document.querySelector('.start-btn');
start.addEventListener('click', StartGame);

nextbutton.addEventListener('click', setNextQuestion);

const restart = document.querySelector('#restart');
restart.addEventListener('click', restartGame);

//array of quiz questions
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

//copy the array to avoid mutating it directly
AvailableQuestions = [...questions];

function StartGame() {
    //display questionContainer on click Start
    let startpage = document.getElementById('start-display');
    let questionContainer = document.getElementById('qstn-container');
    startpage.classList.add('hide');
    questionContainer.classList.remove('hide');
    setNextQuestion();
}

function setNextQuestion() {
    //GET A RANDOM QUESTION//
    //get a random number between 1 and the number of available questions
    const questionIndex = Math.floor(Math.random() * AvailableQuestions.length);
    //get the array item in the position of that number
    currentQuestion = AvailableQuestions[questionIndex];

    //display user's progress
    counter++;
    counterText.innerText = counter + "/" + max_questions

    //display button to end game if conditions are met
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

    //prevent submission if an answer is not chosen
    nextbutton.disabled = true;
    endbutton.disabled = true;

    //show feedback for correct answer
    choices.forEach(choice => {
        choice.addEventListener('click', e => {
            //prevent accepting new answers if an answer has already been selected
            if (!AcceptingAnswers) {
                nextbutton.disabled = false;
                endbutton.disabled = false;
                return;
            }

            AcceptingAnswers = false;

            //get selected option
            const selectedChoice = e.target;
            const selectedAnswer = selectedChoice.dataset['number'];
            //get correct option
            let answerIndex = currentQuestion.answer;
            let correctAnswer = choices[answerIndex - 1];

            //check if selected option is correct or incorrect
            const classToApply =
                selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

            //If correct, highlight green
            if (classToApply === "correct") {
                incrementScore(correct_score);
                selectedChoice.style.backgroundColor = "green";
                selectedChoice.style.color = "white";
            }
            //If wrong, highlight red, then highlight correct answer green
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
    //hide question container and display end page
    const endpage = document.getElementById('end-display');
    const questionContainer = document.getElementById('qstn-container');
    questionContainer.classList.add('hide');
    endpage.classList.remove('hide');
    //display final score
    let finalScore = document.getElementById('final-score');
    finalScore.innerText = score + "/" + max_score;
}

function restartGame() {
    //hide end page and display question container
    let endpage = document.getElementById('end-display');
    let questionContainer = document.getElementById('qstn-container');
    endpage.classList.add('hide');
    questionContainer.classList.remove('hide');
    endbutton.classList.add('hide');
    nextbutton.classList.remove('hide');
    //reset values of variables
    counter = 0;
    score = 0;
    scoreText.innerText = 0;
    AvailableQuestions = [...questions];
    setNextQuestion();
}

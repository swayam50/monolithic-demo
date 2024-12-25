"use strict";

const questionBank = [
    {
        question: "Which is the largest animal in the world?",
        options: [
            { text: "Shark", correct: false },
            { text: "Blue Whale", correct: true },
            { text: "Elephant", correct: false },
            { text: "Giraffe", correct: false },
        ]
    },
    {
        question: "Which many states are there in India?",
        options: [
            { text: "28", correct: true },
            { text: "20", correct: false },
            { text: "50", correct: false },
            { text: "30", correct: false },
        ]
    },
    {
        question: "The sun rises in which direction?",
        options: [
            { text: "North", correct: false },
            { text: "South", correct: false },
            { text: "East", correct: true },
            { text: "West", correct: false },
        ]
    },
    {
        question: "Which is the longest river on Earth?",
        options: [
            { text: "Ganga", correct: false },
            { text: "Mississippi", correct: false },
            { text: "Amazon", correct: false },
            { text: "Nile", correct: true },
        ]
    },
    {
        question: "Which is the capital of Odisha?",
        options: [
            { text: "Puri", correct: false },
            { text: "Khordha", correct: false },
            { text: "Cuttack", correct: false },
            { text: "Bhubaneswar", correct: true },
        ]
    }
];

const questionEle = document.getElementById("question");
const answersEle = document.getElementById("answers");
const nextBtn = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;


function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();

    let currentQuestion = questionBank[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionEle.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.options.forEach(option => {
        const optionBtn = document.createElement("button");
        optionBtn.classList.add("btn");
        optionBtn.innerHTML = option.text;
        optionBtn.dataset.correct = option.correct;
        optionBtn.addEventListener("click", selectAnswer);
        answersEle.appendChild(optionBtn);
    });
}

function resetState() {
    nextBtn.style.display = "none";
    while (answersEle.firstChild) {
        answersEle.removeChild(answersEle.firstChild);
    }
}

function selectAnswer(event) {
    const selectedBtn = event.target;
    if (selectedBtn.dataset.correct === "true") {
        selectedBtn.classList.add("correct");
        score++;
    }
    else
        selectedBtn.classList.add("wrong");

    Array.from(answersEle.children).forEach(button => {
        if (button.dataset.correct === "true")
            button.classList.add("correct");
        button.disabled = true;
    });
    nextBtn.style.display = "block";
}

function showScore() {
    resetState();
    questionEle.innerHTML = `You scored ${score} points out of ${questionBank.length}!`;
    nextBtn.innerHTML = "Play Again";
    nextBtn.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questionBank.length)
        showQuestion();
    else
        showScore();
}

nextBtn.addEventListener("click", () => {
    if (currentQuestionIndex < questionBank.length)
        handleNextButton();
    else
        startQuiz();
});

startQuiz();
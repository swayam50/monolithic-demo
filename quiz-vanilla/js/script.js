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

window.onload = () => { // LEARN: window element, main function syntax (co-relate with python)
    if (window.location.href.includes("quiz.html"))
        startQuiz();
    else if (window.location.href.includes("contribute.html"))
        startContribution();
    else
        showHome();
};

function showHome() {
    console.log("Currently in home page.");

    const startBtn = document.getElementById("start-btn");
    const contributeBtn = document.getElementById("contribute-btn");
    startBtn.addEventListener("click", event => window.location = window.location.href + "html/quiz.html");
    contributeBtn.addEventListener("click", event => window.location = window.location.href + "html/contribute.html")
}

function startContribution() {
    console.log("Currently in contribution page.");

    
}


function startQuiz() {
    console.log("Starting the quiz!");

    const questionEle = document.getElementById("question");
    const answersEle = document.getElementById("answers");
    const nextBtn = document.getElementById("next-btn");
    let score = 0, currQues = 0;

    const elements = { questionEle, answersEle, nextBtn }; // LEARN: short-hand property
    const props = { score, currQues };

    nextBtn.addEventListener("click", handleNextButtonClick(elements, props));
    showQuestion(elements, props);
}

function showQuestion(elements, props) {
    // Clearing the previous question
    elements.nextBtn.style.display = "none";
    elements.answersEle.replaceChildren();
    elements.questionEle.innerHTML = "";

    if (props.currQues >= questionBank.length) {
        // Re-using components for Score Page
        elements.questionEle.innerHTML = `You scored ${props.score} points out of ${questionBank.length}!`;
        elements.nextBtn.innerHTML = "Go To Home";
        elements.nextBtn.style.display = "block";
        elements.nextBtn.removeEventListener("click", handleNextButtonClick);
        elements.nextBtn.addEventListener("click", () => window.location = window.location.origin + "/quiz-vanilla");
        return;
    }

    // Showing the next question
    let questionObj = questionBank[props.currQues++];
    let question = `${props.currQues}. ${questionObj.question}`;
    
    elements.questionEle.innerHTML = question;
    questionObj.options.forEach(opt => {
        const optionBtn = document.createElement("button");
        optionBtn.classList.add("btn");
        optionBtn.dataset.correct = opt.correct;    // LEARN: dataset corresponds to data-* attribute of the tag
        optionBtn.innerHTML = opt.text;
        optionBtn.addEventListener("click", event => {      // LEARN: functionality only shared, will be called on click only

            const selectedBtn = event.target;
            if (selectedBtn.dataset.correct === "true")
                props.score++;
            else
                selectedBtn.classList.add("wrong");
            
            Array.from(elements.answersEle.children).forEach(optionBtn => {     // LEARN: Element (not HTMLElement) 's children give HTMLCollection, search for HTMLCollection to find methods
                if (optionBtn.dataset.correct === "true")
                    optionBtn.classList.add("correct");
                optionBtn.disabled = true;
            });

            elements.nextBtn.style.display = "block";
        });
        elements.answersEle.appendChild(optionBtn);
    });
}

function handleNextButtonClick(elements, props) {
    return () => showQuestion(elements, props);
}
const quizData = [
    {
        question: "How often do you feel stressed?",
        answers: [
            { text: "Rarely", score: 1 },
            { text: "Sometimes", score: 2 },
            { text: "Often", score: 3 }
        ]
    },
    {
        question: "How often do you engage in relaxing activities?",
        answers: [
            { text: "Daily", score: 1 },
            { text: "A few times a week", score: 2 },
            { text: "Rarely", score: 3 }
        ]
    },
    {
        question: "Do you seek help or talk to someone when feeling down?",
        answers: [
            { text: "Yes", score: 1 },
            { text: "Sometimes", score: 2 },
            { text: "No", score: 3 }
        ]
    }
];

var currentQuestionIndex = 0;
var totalScore = 0;

const questionContainer = document.getElementById('question-container');
const answersContainer = document.getElementById('answers-container');
const nextButton = document.getElementById('next-button');
const resultContainer = document.getElementById('result');

var stress=0;
var help =0;


function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionContainer.textContent = currentQuestion.question;

    answersContainer.innerHTML = '';
    for(i=0;i<currentQuestion.answers.length;i++){
        const answer = currentQuestion.answers[i];
        const button = document.createElement('button');
        button.textContent = answer.text;
        button.classList.add('answer-button');
        button.onclick = () => selectAnswer(answer.score);
        answersContainer.appendChild(button);
    }

    function selectAnswer(score) {
        totalScore += score;
        nextButton.classList.remove('hidden');
    }

    nextButton.classList.add('hidden');
}


nextButton.addEventListener('click', function(){
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
});

function showResult() {
    questionContainer.classList.add('hidden');
    answersContainer.classList.add('hidden');
    nextButton.classList.add('hidden');

    var feedback = '';
    if (totalScore <= 3) {
        feedback = "Great! You seem to have good mental well-being habits.";
    } else if (totalScore <= 6) {
        feedback = "You’re doing okay, but there’s room for improvement.";
    } else {
        feedback = "Consider focusing more on self-care and seeking support.";
    }

    resultContainer.textContent = feedback;
    resultContainer.classList.remove('hidden');
}

loadQuestion();

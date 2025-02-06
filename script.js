// ตัวอย่างคำถาม
const quiz = {
    id: "quiz-1",
    questions: [
        { id: 1, text: "คำถามที่ 1?", choices: ["ก", "ข", "ค", "ง"], correct: "ก" },
        { id: 2, text: "คำถามที่ 2?", choices: ["ก", "ข", "ค", "ง"], correct: "ข" },
        { id: 3, text: "คำถามที่ 3?", choices: ["ก", "ข", "ค", "ง"], correct: "ค" },
        { id: 4, text: "คำถามที่ 4?", choices: ["ก", "ข", "ค", "ง"], correct: "ง" },
        { id: 5, text: "คำถามที่ 5?", choices: ["ก", "ข", "ค", "ง"], correct: "ก" },
        { id: 6, text: "คำถามที่ 6?", choices: ["ก", "ข", "ค", "ง"], correct: "ข" },
        { id: 7, text: "คำถามที่ 7?", choices: ["ก", "ข", "ค", "ง"], correct: "ค" },
        { id: 8, text: "คำถามที่ 8?", choices: ["ก", "ข", "ค", "ง"], correct: "ง" },
        { id: 9, text: "คำถามที่ 9?", choices: ["ก", "ข", "ค", "ง"], correct: "ก" },
        { id: 10, text: "คำถามที่ 10?", choices: ["ก", "ข", "ค", "ง"], correct: "ข" },
        { id: 11, text: "คำถามที่ 11?", choices: ["ก", "ข", "ค", "ง"], correct: "ค" },
        { id: 12, text: "คำถามที่ 12?", choices: ["ก", "ข", "ค", "ง"], correct: "ง" },
        { id: 13, text: "คำถามที่ 13?", choices: ["ก", "ข", "ค", "ง"], correct: "ก" },
        { id: 14, text: "คำถามที่ 14?", choices: ["ก", "ข", "ค", "ง"], correct: "ข" },
        { id: 15, text: "คำถามที่ 15?", choices: ["ก", "ข", "ค", "ง"], correct: "ค" },
        { id: 16, text: "คำถามที่ 16?", choices: ["ก", "ข", "ค", "ง"], correct: "ง" },
        { id: 17, text: "คำถามที่ 17?", choices: ["ก", "ข", "ค", "ง"], correct: "ก" },
        { id: 18, text: "คำถามที่ 18?", choices: ["ก", "ข", "ค", "ง"], correct: "ข" },
        { id: 19, text: "คำถามที่ 19?", choices: ["ก", "ข", "ค", "ง"], correct: "ค" },
        { id: 20, text: "คำถามที่ 20?", choices: ["ก", "ข", "ค", "ง"], correct: "ง" }
    ],
    timeLimit: 60, // เวลาในการทำข้อสอบ (วินาที)
    passingScore: 60 // คะแนนผ่าน
};
localStorage.setItem('quiz', JSON.stringify(quiz));

let timer;
let timeLeft = quiz.timeLimit;

function random(quizId) {
    const storageQuiz = JSON.parse(localStorage.getItem('quiz'));

    if (storageQuiz && storageQuiz.id === quizId) {
        const questions = storageQuiz.questions.sort(() => 0.5 - Math.random()).slice(0, 5);
        return { ...storageQuiz, questions };
    }
    return null;
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').innerHTML = `<h2>เวลาเหลือ: ${timeLeft} วินาที</h2>`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            submitQuiz();
        }
    }, 1000);
}

function submitQuiz() {
    clearInterval(timer);
    const questions = quizSession.questions;
    const answers = questions.map(question => {
        const selectedAnswer = document.querySelector(`input[name="question${question.id}"]:checked`);
        return {
            questionId: question.id,
            isCorrect: selectedAnswer ? submitAnswer(question.id, selectedAnswer.value) : false
        };
    });
    const score = calculateScore(answers);
    showResults(score, answers);
}

function showResults(score, answers) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `<p>คะแนนของคุณ: ${score}%</p>`;
    answers.forEach(answer => {
        resultsDiv.innerHTML += `<p>คำถามที่ ${answer.questionId}: ${answer.isCorrect ? 'ถูกต้อง' : 'ผิด'}</p>`;
    });
    document.getElementById('submit-btn').style.display = 'none';
    document.getElementById('restart-btn').style.display = 'block';
}

function submitAnswer(questionId, answer) {
    const question = quiz.questions.find(q => q.id === questionId);
    return question.correct === answer;
}

function calculateScore(answers) {
    const totalQuestions = answers.length;
    const correctAnswers = answers.filter(answer => answer.isCorrect).length;
    return (correctAnswers / totalQuestions) * 100;
}

function displayQuestions(questions) {
    const questionsDiv = document.getElementById('questions');
    questionsDiv.innerHTML = ''; // ล้างคำถามเก่าก่อนแสดงคำถามใหม่

    questions.forEach(question => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        questionDiv.innerHTML = `<p>${question.text}</p>`;

        const choicesDiv = document.createElement('div');
        choicesDiv.className = 'choices';
        question.choices.forEach(choice => {
            choicesDiv.innerHTML += `
                <label>
                    <input type="radio" name="question${question.id}" value="${choice}">${choice}
                </label><br>
            `;
        });
        questionDiv.appendChild(choicesDiv);
        questionsDiv.appendChild(questionDiv);
    });
}

function restartQuiz() {
    document.getElementById('results').innerHTML = '';
    document.getElementById('submit-btn').style.display = 'block';
    document.getElementById('restart-btn').style.display = 'none';
    timeLeft = quiz.timeLimit;
    document.getElementById('timer').textContent = `เวลาเหลือ: ${timeLeft} วินาที`;
    quizSession = random('quiz-1');
    displayQuestions(quizSession.questions);
    startTimer();
}

document.getElementById('submit-btn').addEventListener('click', submitQuiz);
document.getElementById('restart-btn').addEventListener('click', restartQuiz);

// เริ่มควิซด้วยการแสดงคำถาม
let quizSession = random('quiz-1');
displayQuestions(quizSession.questions);
startTimer();

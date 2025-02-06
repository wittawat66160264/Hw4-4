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

function random(quizId){
    //parse แปลงให้กลายเป็นออบเจ็กต์ (object) หรือข้อมูลประเภทอื่นๆ ที่สามารถใช้งานใน JavaScript get ดึงข้อมูล
    const storageQuiz = JSON.parse(localStorage.getItem('quiz'));

    if (storageQuiz && storageQuiz.id === quizId) {
        const questions = storageQuiz.questions.sort(() => 0.5 - Math.random()).slice(0, 5);
        return { ...storageQuiz, questions };
    }
    return null;
}

function submitAnswer(){

}
                          //ส่งแปร questions
function displayQuestions(questions) {
                                                // id = questions
    const questionsDiv = document.getElementById('questions');
    questionsDiv.innerHTML = ''; // ล้างคำถามเก่าก่อนแสดงคำถามใหม่
        //ลูปเพิ่มคำถามทีละข้อ
    //------------------สร้างคำถาม-----------------------------/ 
                     //กำหนดตัวแปรใหม่ ไว้ใช้ในการลูป 
    questions.forEach(question => {
                //ตัวแปรเก็บกล่องdiv      //สร้าง div 
        const questionDiv = document.createElement('div');
        //     <div class="question">
        questionDiv.className = 'question';
        //      กำหนด html ใน div
        questionDiv.innerHTML = `<p>${question.text}</p>`;

    //------------------สร้างคำตอบ-----------------------------/
                //ตัวแปรเก็บกล่องdiv      //สร้าง div
        const choicesDiv = document.createElement('div');
        //       <div class="choices">
        choicesDiv.className = 'choices';
        //ลูปในลูปที่เป็น question เพราะกำหมดมาใหม่ จากลูปแรก 
        question.choices.forEach(choice => {
        //    กำหนด html ใน div
            choicesDiv.innerHTML += `
                <label>
                    <input type="radio" name="question${question.id}" value="${choice}">${choice}
                </label><br>
            `;
        });
        //appendChild ใช้เพื่อเพิ่ม ลูก (child) เข้ากับ พ่อ (parent)

        //เพิ่มตัวเลือกลงในคำถาม
        questionDiv.appendChild(choicesDiv);
        //เพิ่มคำถาม (พร้อมตัวเลือก) ลงในพื้นที่แสดงคำถามทั้งหมด
        questionsDiv.appendChild(questionDiv);
    });
}
let questionrandom = random('quiz-1');
displayQuestions(questionrandom.questions);


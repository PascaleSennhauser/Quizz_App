let currentQuestion = 0;

function init() {
    document.getElementById('allQuestions').innerHTML = questions.length;
    showQuestion();
}


function showQuestion() {
    let question = questions[currentQuestion];
    document.getElementById('questionText').innerHTML = question['question'];
    for (let i = 1; i <= 4; i++) {
        document.getElementById(`answer_${i}`).innerHTML = question[`answer_${i}`];
    }
}


function answer(selection) {
    let question = questions[currentQuestion];
    let selectedQuestionNumber = selection.slice(-1);
    if(selectedQuestionNumber == question['right_answer']) {
        document.getElementById(selection).parentNode.classList.add('bg-success');
    } else {
        document.getElementById(selection).parentNode.classList.add('bg-danger');
    }
}
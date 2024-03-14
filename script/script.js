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
    let idOfRightAnswer = `answer_${question['right_answer']}`;
    if(selectedQuestionNumber == question['right_answer']) {
        document.getElementById(selection).parentNode.classList.add('bg-success');
    } else {
        document.getElementById(selection).parentNode.classList.add('bg-danger');
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
    }
    document.getElementById('nextButton').disabled = false;
    removeOnClick();
}


function removeOnClick() {
    for (let i = 1; i <= 4; i++) {
        let card = getParentNodeFromAnswerButton(i);
        card.onclick = null;
        card.classList.remove('quiz-answer-card');
    }
}


function getParentNodeFromAnswerButton(i) {
    let bodyId = document.getElementById(`answer_${i}`);
    let cardId = bodyId.parentNode;
    cardId.id = `cardId_${i}`;
    return cardId;
}


function nextQuestion() {
    currentQuestion++;
    document.getElementById('nextButton').disabled = true;
    addOnClick();
    resetAnswerButtons();
    showQuestion();
}


function addOnClick() {
    for (let i = 1; i <= 4; i++) {
        let card = getParentNodeFromAnswerButton(i);
        card.onclick = function() {
            answer(`answer_${i}`);
        };
        card.classList.add('quiz-answer-card');
    }
}


function resetAnswerButtons() {
    for(let i = 1; i <= 4; i++) {
        document.getElementById(`answer_${i}`).parentNode.classList.remove('bg-danger');
        document.getElementById(`answer_${i}`).parentNode.classList.remove('bg-success');
    }
}
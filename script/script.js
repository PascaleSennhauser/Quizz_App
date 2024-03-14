let currentQuestion = 0;
let rightQuestions = 0;

function init() {
    document.getElementById('allQuestions').innerHTML = questions.length;
    showQuestion();
}


function showQuestion() {
    if (currentQuestion >= questions.length) {
        document.getElementById('endScreen').style = '';
        document.getElementById('questionBody').style = 'display: none;';
        showEndScreenWin();
        document.getElementById('amountOfQuestions').innerHTML = questions.length;
        document.getElementById('amountOfRightQuestions').innerHTML = rightQuestions;
    } else {
        let percent = (currentQuestion + 1) / questions.length;
        percent = Math.round(percent * 100);
        document.getElementById('progressBar').innerHTML = `${percent} %`;
        document.getElementById('progressBar').style.width = `${percent}%`;
        let question = questions[currentQuestion];
        document.getElementById('questionText').innerHTML = question['question'];
        for (let i = 1; i <= 4; i++) {
            document.getElementById(`answer_${i}`).innerHTML = question[`answer_${i}`];
        }
        document.getElementById('questionNumber').innerHTML = currentQuestion+1;
    }
}


function showEndScreenWin() {
    document.getElementById('endScreenText').innerHTML = 'Gewonnen! Coco freut sich über den Knochen!';
    document.getElementById('cardImgTopContainer').innerHTML = /*html*/`
    <div class="card-img-top-container-winscreen">
        <div class="firework-container">
            <img src="./assets/img/firework.png" class="firework">
            <img src="./assets/img/firework.png" class="firework"> 
        </div>
        <div class="dog-bone-container">
            <img src="./assets/img/icon-corgi.png" class="winscreen-corgi">
            <img src="./assets/img/bone.png" class="winscreen-bone">     
        </div>
    </div>
    `;
}


function answer(selection) {
    let question = questions[currentQuestion];
    let selectedQuestionNumber = selection.slice(-1);
    let idOfRightAnswer = `answer_${question['right_answer']}`;
    if(selectedQuestionNumber == question['right_answer']) {
        document.getElementById(selection).parentNode.classList.add('bg-success');
        rightQuestions++;
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


function restartGame() {
    document.getElementById('cardImgTopContainer').innerHTML = /*html*/`
        <img src="./assets/img/quiz.jpg" class="card-img-top">
    `;
    rightQuestions = 0;
    currentQuestion = 0;
    displayNoneEndScreen();
    init();
}


function displayNoneEndScreen() {
    document.getElementById('endScreen').style = 'display: none';
    document.getElementById('questionBody').style = '';
}
let currentQuestion = 0;
let rightQuestions = 0;
let AUDIO_RIGHT = new Audio('./assets/audio/right.mp3');
let AUDIO_FALSE = new Audio('./assets/audio/false.mp3');


function init() {
    document.getElementById('allQuestions').innerHTML = questions.length;
    showQuestion();
}


function startQuizz() {
    document.getElementById('startMenu').style = "display: none;";
}


function showQuestion() {
    if (gameIsOver()) {
        showEndScreen();
        if (rightQuestions == questions.length) {
            showEndScreenWin();
        } else {
            showEndScreenLoose();
        }
    } else {
        updateProgressBar();
        updateToNextQuestion();
    }
}


function gameIsOver() {
    return currentQuestion >= questions.length
}


function showEndScreen() {
    document.getElementById('endScreen').style = '';
    document.getElementById('questionBody').style = 'display: none;';
    document.getElementById('amountOfQuestions').innerHTML = questions.length;
    document.getElementById('amountOfRightQuestions').innerHTML = rightQuestions;
}


function showEndScreenWin() {
    document.getElementById('cardImgTopContainer').innerHTML = winnerImageTemplate();
    winnerText();
}


function winnerImageTemplate() {
    return /*html*/ `
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


function winnerText() {
    document.getElementById('endScreenText').innerHTML = 'Gewonnen! Coco freut sich über den Knochen!';
}


function showEndScreenLoose() {
    document.getElementById('cardImgTopContainer').innerHTML = looserImageTemplate();
    looserText();
}


function looserImageTemplate() {
    return /*html*/`
    <div class="card-img-top-container-loosescreen">
        <img src="./assets/img/icon-corgi.png" class="loosescreen-corgi">
        <div class="thought-container">
            <img src="./assets/img/thought-bubble.png" class="loosescreen-thought-bubble">
            <img src="./assets/img/bone.png" class="loosescreen-bone">
        </div>
    </div>
    `;
}


function looserText() {
    document.getElementById('endScreenText').innerHTML = 'Leider bekommt Coco keinen Knochen... Versuche es erneut!';
}


function updateProgressBar() {
    let percent = (currentQuestion + 1) / questions.length;
    percent = Math.round(percent * 100);
    document.getElementById('progressBar').innerHTML = `${percent} %`;
    document.getElementById('progressBar').style.width = `${percent}%`;
}



function updateToNextQuestion() {
    let question = questions[currentQuestion];
    document.getElementById('questionText').innerHTML = question['question'];
    for (let i = 1; i <= 4; i++) {
        document.getElementById(`answer_${i}`).innerHTML = question[`answer_${i}`];
    }
    document.getElementById('questionNumber').innerHTML = currentQuestion+1;
}


function answer(selection) {
    let question = questions[currentQuestion];
    let selectedQuestionNumber = selection.slice(-1);
    let idOfRightAnswer = `answer_${question['right_answer']}`;
    ifElseStatmentForCheckingTheAnswer(selectedQuestionNumber, question, selection, idOfRightAnswer);
    document.getElementById('nextButton').disabled = false;
    removeOnClick();
}


function ifElseStatmentForCheckingTheAnswer(selectedQuestionNumber, question, selection, idOfRightAnswer) {
    if(rightAnswerSelected(selectedQuestionNumber, question)) {
        document.getElementById(selection).parentNode.classList.add('bg-success');
        AUDIO_RIGHT.play();
        rightQuestions++;
    } else {
        document.getElementById(selection).parentNode.classList.add('bg-danger');
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
        AUDIO_FALSE.play();
    }
}


function rightAnswerSelected(selectedQuestionNumber, question) {
    return selectedQuestionNumber == question['right_answer'];
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
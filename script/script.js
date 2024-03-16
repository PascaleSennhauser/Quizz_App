let currentQuestion = 0;
let rightQuestions = 0;
let AUDIO_RIGHT = new Audio('./assets/audio/right.mp3');
let AUDIO_FALSE = new Audio('./assets/audio/false.mp3');


/**
 * This function removes the start page and initializes the first quiz card.
 */
function startQuizz() {
    document.getElementById('startMenu').style = "display: none;";
    init();
}

/**
 * This function initializes the first quiz card.
 */
function init() {
    document.getElementById('allQuestions').innerHTML = questions.length;
    showQuestion();
}


/**
 * This function shows the current question or the endscreen.
 */
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


/**
 * This function checks if the game is over.
 * @returns The boolescher value "true" or "false" gets returned.
 */
function gameIsOver() {
    return currentQuestion >= questions.length
}


/**
 * This function shows the card, when the game is over.
 */
function showEndScreen() {
    document.getElementById('endScreen').style = '';
    document.getElementById('questionBody').style = 'display: none;';
    document.getElementById('amountOfQuestions').innerHTML = questions.length;
    document.getElementById('amountOfRightQuestions').innerHTML = rightQuestions;
}


/**
 * This function shows the winner screen.
 */
function showEndScreenWin() {
    document.getElementById('cardImgTopContainer').innerHTML = winnerImageTemplate();
    winnerText();
}


/**
 * This function returns the image from the winner endscreen.
 * @returns The html-template of the image gets returned.
 */
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


/**
 * This function shows the winner text.
 */
function winnerText() {
    document.getElementById('endScreenText').innerHTML = 'Gewonnen! Coco freut sich über den Knochen!';
}


/**
 * This function shows the looser screen.
 */
function showEndScreenLoose() {
    document.getElementById('cardImgTopContainer').innerHTML = looserImageTemplate();
    looserText();
}


/**
 * This function returns the image from the looser endscreen.
 * @returns The html-template of the image gets returned.
 */
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



/**
 * This function shows the looser text.
 */
function looserText() {
    document.getElementById('endScreenText').innerHTML = 'Leider bekommt Coco keinen Knochen... Versuche es erneut!';
}


/**
 * This function updates the progress bar.
 */
function updateProgressBar() {
    let percent = (currentQuestion + 1) / questions.length;
    percent = Math.round(percent * 100);
    document.getElementById('progressBar').innerHTML = `${percent} %`;
    document.getElementById('progressBar').style.width = `${percent}%`;
}


/**
 * This function shows the next question.
 */
function updateToNextQuestion() {
    let question = questions[currentQuestion];
    document.getElementById('questionText').innerHTML = question['question'];
    for (let i = 1; i <= 4; i++) {
        document.getElementById(`answer_${i}`).innerHTML = question[`answer_${i}`];
    }
    document.getElementById('questionNumber').innerHTML = currentQuestion+1;
}


/**
 * This function checks the selected answer and calculates the numer of the right questions.
 * @param {String} selection - The name of the right answer.
 */
function answer(selection) {
    let question = questions[currentQuestion];
    let selectedQuestionNumber = selection.slice(-1);
    let idOfRightAnswer = `answer_${question['right_answer']}`;
    ifElseStatmentForCheckingTheAnswer(selectedQuestionNumber, question, selection, idOfRightAnswer);
    document.getElementById('nextButton').disabled = false;
    removeOnClick();
}


/**
 * This function checks if the answer is right or wrong.
 * @param {String} selectedQuestionNumber - This is the number as a String from the selected question.
 * @param {Object} question - This is the current object from the array "questions".
 * @param {String} selection - This is the name of the slected answer.
 * @param {String} idOfRightAnswer - This is the name of the right answer.
 */
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


/**
 * This function removes the onclick-attribute from the answers, when a answer is selected.
 */
function removeOnClick() {
    for (let i = 1; i <= 4; i++) {
        let card = getParentNodeFromAnswerButton(i);
        card.onclick = null;
        card.classList.remove('quiz-answer-card');
    }
}


/**
 * This function gets the parent-element form the answer-button.
 * @param {Number} i - The number of the question.
 * @returns The new-id of the parent-element from the answer-button.
 */
function getParentNodeFromAnswerButton(i) {
    let bodyId = document.getElementById(`answer_${i}`);
    let cardId = bodyId.parentNode;
    cardId.id = `cardId_${i}`;
    return cardId;
}


/**
 * This function shows the next question.
 */
function nextQuestion() {
    currentQuestion++;
    document.getElementById('nextButton').disabled = true;
    addOnClick();
    resetAnswerButtons();
    showQuestion();
}


/**
 * This function adds the onclick function to the answer buttons, when a new question is loaded.
 */
function addOnClick() {
    for (let i = 1; i <= 4; i++) {
        let card = getParentNodeFromAnswerButton(i);
        card.onclick = function() {
            answer(`answer_${i}`);
        };
        card.classList.add('quiz-answer-card');
    }
}


/**
 * This function removes the background color of the answer buttons.
 */
function resetAnswerButtons() {
    for(let i = 1; i <= 4; i++) {
        document.getElementById(`answer_${i}`).parentNode.classList.remove('bg-danger');
        document.getElementById(`answer_${i}`).parentNode.classList.remove('bg-success');
    }
}


/**
 * This function restarts the game.
 */
function restartGame() {
    document.getElementById('cardImgTopContainer').innerHTML = /*html*/`
        <img src="./assets/img/quiz.jpg" class="card-img-top">
    `;
    rightQuestions = 0;
    currentQuestion = 0;
    displayNoneEndScreen();
    init();
}


/**
 * This function removes the endscreen.
 */
function displayNoneEndScreen() {
    document.getElementById('endScreen').style = 'display: none';
    document.getElementById('questionBody').style = '';
}
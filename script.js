'use strict';

document.addEventListener('DOMContentLoaded', setPageInitialState);

document.querySelector('#btnShowRules').addEventListener('click', toggleRules);

document.querySelector('#playerOptions').addEventListener('click', getPlayerChoice);

document.querySelector('#btnRestartGame').addEventListener('click', setPageInitialState);

document.querySelector('#btnConfirmOption').addEventListener('click', takeTurn);

let playerChoice = null;
let computerChoice = null;
let duelWinner = null;
let playerScore = 0;
let computerScore = 0;
let turnCount = 5;

function setPageInitialState() {
    playerChoice = null;
    document.querySelector('#turnsLeft').textContent = 5;
    disableConfirmBtn();
    resetImagesToInitial();
    playerChoice = null;
    computerChoice = null;
    duelWinner = null;
    playerScore = 0;
    computerScore = 0;
    turnCount = 5;
    resetBackgroundToInitial();
    resetImagesToInitial();
    document.querySelector('#playerPointsCounter').textContent = playerScore;
    document.querySelector('#computerPointsCounter').textContent = playerScore;
    document.querySelector('#turnsLeft').textContent = turnCount;
    document.querySelector('#playerOptions').classList.remove('display-none');
    document.querySelector('#btnConfirmOption').classList.remove('display-none');
    document.querySelector('#playerSide').style.opacity = 1;
    document.querySelector('#computerSide').style.opacity = 1;
    document.querySelector('#resultText').style.opacity = 1;
    document.querySelector('#playerOptionsTxt').textContent = 'Pick one option and confirm your choice!';
}

function toggleRules() {
    let rules = document.querySelector('#rules');
    rules.classList.toggle('display-none');
    if (rules.classList.contains('display-none')) {
        document.querySelector('#btnShowRules').textContent = 'Show Rules';
    } else {
        document.querySelector('#btnShowRules').textContent = 'Hide Rules';
    }
};

function getPlayerChoice(e) {
    resetImagesToInitial();
    enableConfirmBtn();
    switch (e.target.id) {
        case ('snowman'):
            document.querySelector('#playerChoiceImg').src = "./images/snowman-icon.png";
            playerChoice = 'snowman';
            break;
        case ('campfire'):
            document.querySelector('#playerChoiceImg').src = "./images/campfire-icon.png";
            playerChoice = 'campfire';
            break;
        case ('catapult'):
            document.querySelector('#playerChoiceImg').src = "./images/catapult-icon.png";
            playerChoice = 'catapult';
            break;
    }
    if (!(turnCount == 5)) {
        resetBackgroundToInitial();
    }
};

function takeTurn(e) {
    let confirmBtn = e.target;
    if (playerChoice) {
        disableConfirmBtn();
        disableOptionsBtns();
        confirmBtn.textContent = 'Confirmed';
        setOrangeBackground();
        startTimer();
    }
};

function startTimer() {
    document.querySelector('#resultText').classList.toggle('display-none');
    document.querySelector('#countdown').classList.toggle('display-none');
    document.querySelector('#timer').textContent = 3;
    let i = 3;
    disableRestartBtn();
    let timer = setInterval(() => {
        i--;
        document.querySelector('#timer').textContent = i;
        if (!i) {
            clearInterval(timer);
            enableRestartBtn();
            getComputerChoice();
            getWinner(computerChoice, playerChoice);
            showComputerImg();
            document.querySelector('#resultText').classList.toggle('display-none');
            document.querySelector('#countdown').classList.toggle('display-none');
            writeDuelResult(duelWinner);
            setResultColors(duelWinner);
            updateScore(duelWinner);
            updateTurnCount(turnCount);
            if (turnCount == 0) {
                document.querySelector('#playerOptions').classList.add('display-none');
                document.querySelector('#playerSide').style.opacity = 0.5;
                document.querySelector('#computerSide').style.opacity = 0.5;
                document.querySelector('#resultText').style.opacity = 0.5;
                showResultMsg();
                document.querySelector('#btnConfirmOption').classList.add('display-none');
            }
            enableOptionsBtns();
            document.querySelector('#btnConfirmOption').textContent = 'Confirm choice';

        }
    }, 1000);
};

function showResultMsg() {
    if (playerScore > computerScore) {
        document.querySelector('#playerOptionsTxt').textContent = 'Congratulation, you have WON this duel! Click on Restart Duel to play again!';
    } else if (playerScore < computerScore) {
        document.querySelector('#playerOptionsTxt').textContent = 'Sorry, you have LOST this duel. Click on Restart Duel to try again!';
    } else {
        document.querySelector('#playerOptionsTxt').textContent = 'It\'s a TIE! Click on Restart Duel to play again!';
    }
};

function writeDuelResult(duelWinner) {
    if (duelWinner === 'player') {
        document.querySelector('#resultText').textContent = `${(playerChoice[0].toUpperCase()) + playerChoice.slice(1)} beats ${computerChoice}.
                You get 1 point!`;
    } else if (duelWinner === 'computer') {
        document.querySelector('#resultText').textContent = `${(computerChoice[0].toUpperCase()) + computerChoice.slice(1)} beats ${playerChoice}.
                Your opponent gets 1 point.`;
    } else if (duelWinner === 'tie') {
        document.querySelector('#resultText').textContent = `It's a TIE, score doesn't change!`;
    }
};

function setResultColors(duelWinner) {
    if (duelWinner === 'player') {
        document.querySelector('#playerChoiceImg').classList.add('backgroundColor-green');
        document.querySelector('#computerChoiceImg').classList.add('backgroundColor-red');
    }
    if (duelWinner === 'computer') {
        document.querySelector('#playerChoiceImg').classList.add('backgroundColor-red');
        document.querySelector('#computerChoiceImg').classList.add('backgroundColor-green');
    }
    if (duelWinner === 'tie') {
        document.querySelector('#playerChoiceImg').classList.add('backgroundColor-orange');
        document.querySelector('#computerChoiceImg').classList.add('backgroundColor-orange');
    }
};

function updateScore(duelWinner) {
    if (duelWinner == 'player') {
        playerScore += 1;
        document.querySelector('#playerPointsCounter').textContent = Number(playerScore);
        return playerScore;
    } else if (duelWinner == 'computer') {
        computerScore += 1;
        document.querySelector('#computerPointsCounter').textContent = Number(computerScore);
        return computerScore;
    }
};

function updateTurnCount() {
    --turnCount
    document.querySelector('#turnsLeft').textContent = turnCount;
    return turnCount;
};

function disableRestartBtn() {
    let restartGame = document.querySelector('#btnRestartGame');
    restartGame.disabled = true;
    restartGame.style.opacity = 0.5;
    restartGame.classList.remove('hover');
};

function enableRestartBtn() {
    let restartGame = document.querySelector('#btnRestartGame');
    restartGame.disabled = false;
    restartGame.style.opacity = 1;
    restartGame.classList.add('hover');
};

function disableOptionsBtns() {
    let optionsBtns = document.querySelectorAll('#playerOptions button');
    optionsBtns.forEach((item) => {
        item.disabled = true;
        item.style.opacity = 0.5;
        item.classList.remove('hover');
    })
};

function enableOptionsBtns() {
    let optionsBtns = document.querySelectorAll('#playerOptions button');
    optionsBtns.forEach((item) => {
        item.disabled = false;
        item.style.opacity = 1;
        item.classList.add('hover');
    })
};

function disableConfirmBtn() {
    let confirmOption = document.querySelector('#btnConfirmOption');
    confirmOption.disabled = true;
    confirmOption.style.opacity = 0.5;
    confirmOption.classList.remove('hover');
};

function enableConfirmBtn() {
    let confirmOption = document.querySelector('#btnConfirmOption');
    confirmOption.disabled = false;
    confirmOption.style.opacity = 1;
    confirmOption.classList.add('hover');
};

function resetImagesToInitial() {
    document.querySelector('#playerChoiceImg').src = "./images/questionmark-icon.png";
    document.querySelector('#playerChoiceImg').classList.add('box-shadow');
    document.querySelector('#computerChoiceImg').src = "./images/questionmark-icon.png";
    document.querySelector('#computerChoiceImg').classList.add('box-shadow');
};

function resetBackgroundToInitial() {
    document.querySelector('#playerChoiceImg').classList.remove('backgroundColor-red', 'backgroundColor-green', 'backgroundColor-orange');
    document.querySelector('#computerChoiceImg').classList.remove('backgroundColor-red', 'backgroundColor-green', 'backgroundColor-orange');
};

function getComputerChoice() {
    let equation = ((Math.random() * (3 - 1) + 1).toFixed(0));
    if (equation == 1) {
        computerChoice = 'snowman';
    }
    if (equation == 2) {
        computerChoice = 'catapult';
    }
    if (equation == 3) {
        computerChoice = 'campfire';
    }
};

function setOrangeBackground() {
    document.querySelector('#playerChoiceImg').classList.toggle('backgroundColor-orange');
    document.querySelector('#computerChoiceImg').classList.toggle('backgroundColor-orange');
};

function getWinner(computerChoice, playerChoice) {

    if (computerChoice === 'snowman') {
        switch (playerChoice) {
            case ('snowman'):
                duelWinner = 'tie';
                break;
            case ('campfire'):
                duelWinner = 'computer';
                break;
            case ('catapult'):
                duelWinner = 'player';
                break;
        }
    }
    else if (computerChoice === 'campfire') {
        switch (playerChoice) {
            case ('snowman'):
                duelWinner = 'player';
                break;
            case ('campfire'):
                duelWinner = 'tie';
                break;
            case ('catapult'):
                duelWinner = 'computer';
                break;
        }
    }
    else if (computerChoice === 'catapult') {
        switch (playerChoice) {
            case ('snowman'):
                duelWinner = 'computer';
                break;
            case ('campfire'):
                duelWinner = 'player';
                break;
            case ('catapult'):
                duelWinner = 'tie';
                break;
        }
    }
};

function showComputerImg() {
    if (computerChoice === 'snowman') {
        document.querySelector('#computerChoiceImg').src = "./images/snowman-icon.png";
    } else if (computerChoice === 'campfire') {
        document.querySelector('#computerChoiceImg').src = "./images/campfire-icon.png";
    } else if (computerChoice === 'catapult') {
        document.querySelector('#computerChoiceImg').src = "./images/catapult-icon.png";
    }
};


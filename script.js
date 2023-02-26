'use strict';

document.addEventListener('DOMContentLoaded', setPageInitialState);

document.querySelector('#btnShowRules').addEventListener('click', toggleRules);

document.querySelector('#playerOptions').addEventListener('click', getPlayerChoice);

document.querySelector('#btnRestartGame').addEventListener('click', setPageInitialState);

document.querySelector('#btnConfirmOption').addEventListener('click', takeTurn);







let playerChoice = null;
let computerChoice = null;
let duelWinner = null;


//list of functions:

function setPageInitialState() {
    playerChoice = null;
    document.querySelector('#turnsLeft').textContent = 5;
    disableConfirmBtn();
    resetImagesToInitial();
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
    enableConfirmBtn();
    switch (e.target.id) {
        case ('snowman'):
            document.querySelector('#playerChoiceImg').src = "./images/snowman-icon.png";
            playerChoice = 'snowman';
            break;
        case ('fire'):
            document.querySelector('#playerChoiceImg').src = "./images/campfire-icon.png";
            playerChoice = 'fire';
            break;
        case ('catapult'):
            document.querySelector('#playerChoiceImg').src = "./images/catapult-icon.png";
            playerChoice = 'catapult';
            break;
    }
    console.log(`player choice is ${playerChoice}`);
};

function takeTurn(e) {
    let confirmBtn = e.target;
    //ak je zvolena moznost
    if (playerChoice) {
        //button na disabled
        disableConfirmBtn();
        disableOptionsBtns();
        //zmeni napis buttonu na 'Confirmed'
        confirmBtn.textContent = 'Confirmed!';
        //tajne vyberie moznost pre supera a porovna hracovu a superovu moznost, urci vitaza
        //da oranzovy tien mojej a superovej moznosti
        setOrangeBackground();
        //spusti odpocet 3 sekund
        startTimer();

    }
    //podla jej vysledku ohranici vitazny obrazok zeleno, porazeneho cerveno
    //napise kto vyhral a ze ziskava 1 bod
    //priradi skore vitazovi
    //odpocita 1 turn
    //zmeni napis buttonu na 'Confirm choice'
    //obrazky zmeni na otaznik
    //obrazkom da cierny tien
    //zresetuje napis medzi obrazkami na defaultny
}

function startTimer() {

    document.querySelector('#resultText').classList.toggle('display-none');
    document.querySelector('#countdown').classList.toggle('display-none');
    document.querySelector('#timer').textContent = 3;
    let i = 3;
    disableRestartBtn()
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
            if (duelWinner === 'player') {
                document.querySelector('#resultText').textContent = `${(playerChoice[0].toUpperCase()) + playerChoice.slice(1)} beats ${computerChoice}.
                You have won this duel and get 1 point!`;
            } else if (duelWinner === 'computer') {
                document.querySelector('#resultText').textContent = `${(computerChoice[0].toUpperCase()) + computerChoice.slice(1)} beats ${playerChoice}.
                You have lost this duel, opponent gets 1 point.`;
            } else if (duelWinner === 'tie') {
                document.querySelector('#resultText').textContent = `It's a tie, score doesn't change!`;
            }
        }
    }, 1000);

}

function disableRestartBtn() {
    let restartGame = document.querySelector('#btnRestartGame');
    restartGame.disabled = true;
    restartGame.style.opacity = 0.5;
    restartGame.classList.remove('hover');
}

function enableRestartBtn() {
    let restartGame = document.querySelector('#btnRestartGame');
    restartGame.disabled = false;
    restartGame.style.opacity = 1;
    restartGame.classList.add('hover');
}

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
}

function disableConfirmBtn() {
    let confirmOption = document.querySelector('#btnConfirmOption');
    confirmOption.disabled = true;
    confirmOption.style.opacity = 0.5;
    confirmOption.classList.remove('hover');
}

function enableConfirmBtn() {
    let confirmOption = document.querySelector('#btnConfirmOption');
    confirmOption.disabled = false;
    confirmOption.style.opacity = 1;
    confirmOption.classList.add('hover');
}

function resetImagesToInitial() {
    document.querySelector('#playerChoiceImg').src = "./images/questionmark-icon.png";
    document.querySelector('#playerChoiceImg').classList.add('box-shadow');
    document.querySelector('#computerChoiceImg').src = "./images/questionmark-icon.png";
    document.querySelector('#computerChoiceImg').classList.add('box-shadow');
}

function getComputerChoice() {
    let equation = ((Math.random() * (9 - 1) + 1).toFixed(0));
    if ((equation >= 1) && (equation <= 3)) {
        computerChoice = 'snowman';
    }
    if (equation > 6) {
        computerChoice = 'catapult';
    }
    if ((equation > 3) && (equation <= 6)) {
        computerChoice = 'fire';
    }
    console.log(`computer choice is ${computerChoice}`);
};

function setOrangeBackground() {
    document.querySelector('#playerChoiceImg').classList.toggle('backgroundColor-orange');
    document.querySelector('#computerChoiceImg').classList.toggle('backgroundColor-orange');
}

function getWinner(computerChoice, playerChoice) {

    if (computerChoice === 'snowman') {
        switch (playerChoice) {
            case ('snowman'):
                duelWinner = 'tie';
                break;
            case ('fire'):
                duelWinner = 'computer';
                break;
            case ('catapult'):
                duelWinner = 'player';
                break;
        }
    }
    else if (computerChoice === 'fire') {
        switch (playerChoice) {
            case ('snowman'):
                duelWinner = 'player';
                break;
            case ('fire'):
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
            case ('fire'):
                duelWinner = 'player';
                break;
            case ('catapult'):
                duelWinner = 'tie';
                break;
        }
    }
    console.log(`winner is ${duelWinner}`);
}

function showComputerImg() {
    if (computerChoice === 'snowman') {
        document.querySelector('#computerChoiceImg').src = "./images/snowman-icon.png";
    } else if (computerChoice === 'fire') {
        document.querySelector('#computerChoiceImg').src = "./images/campfire-icon.png";
    } else if (computerChoice === 'catapult') {
        document.querySelector('#computerChoiceImg').src = "./images/catapult-icon.png";
    }
}

//test button
document.querySelector('#test').addEventListener('click', (e) => {
    console.log(getWinner());
})


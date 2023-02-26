'use strict';

document.querySelector('#btnShowRules').addEventListener('click', toggleRules);

document.querySelector('#playerOptions').addEventListener('click', displayPlayerChoice);

document.addEventListener('DOMContentLoaded', setPageInitialState);

document.querySelector('#btnRestartGame').addEventListener('click', setPageInitialState);








let playerChoice = '';


//list of functions:

function setPageInitialState() {
    let confirmOption = document.querySelector('#btnConfirmOption')
    confirmOption.disabled = true;
    confirmOption.style.opacity = 0.5;
    confirmOption.classList.remove('hover');
    document.querySelector('#turnsLeft').textContent = 5;
    document.querySelector('#playerChoiceImg').src = "./images/questionmark-icon.png";
    document.querySelector('#computerChoiceImg').src = "./images/questionmark-icon.png";

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

function displayPlayerChoice(e) {
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
};

function getPlayersChoice(e) { }
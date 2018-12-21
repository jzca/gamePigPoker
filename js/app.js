if (navigator.serviceWorker) {
    navigator.serviceWorker.register('sw.js')
        .then(() => {
            console.log('Service Worker Installed')
        })
        .catch(() => {
            console.log('Service Worker FAILED! to Install')
        })
}

/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let currentScoreA = 0;
let currentScoreB = 0;
let finalScoreA = 0;
let finalScoreB = 0;
let currentPlayer = 1;
let randomStarter;
let gameOver = false;



const rollIt = document.querySelector('.btn-roll');
const holdIt = document.querySelector('.btn-hold');
const dice = document.querySelector('.dice');
const dice2 = document.querySelector('.dice2');
let p1Current = document.getElementById('current-0');
let p2Current = document.getElementById('current-1');
let p1Final = document.getElementById('score-0');
let p2Final = document.getElementById('score-1');
const p1Active = document.querySelector('.player-0-panel');
const p2Active = document.querySelector('.player-1-panel');
//const isActive = document.querySelectorAll('.panel');
const wonMsg = document.querySelector('.ion-ios-plus-outline');
const WonP1 = document.getElementById('name-0');
const WonP2 = document.getElementById('name-1');
const newGame = document.querySelector('.btn-new');

const wonSco = document.getElementsByClassName('btn-score');
const inputSco = document.getElementById('input-score');
const rules = document.querySelector('.btn-rules')
let scoreUpdater = inputSco.value;




rollIt.addEventListener('click', function () {
    // if (scoreUpdater === parseInt()||(this.value===parseInt())) {
    //     this.value=parseInt(100)
    //     scoreUpdater = parseInt(100);
    // } 
    if (scoreUpdater == "") {
        scoreUpdater = 100;
    } else if (inputSco.value == NaN) {
        scoreUpdater = 100;
    } else if (inputSco.value == 0) {
        scoreUpdater = 100;
    } else {
        console.log('roll' + scoreUpdater);
        scoreUpdater = parseInt(inputSco.value);
    }
    // console.log('roll' + scoreUpdater);

    if (!gameOver) {
        let random = Math.floor((Math.random() * 15) + 1);
        let random2 = Math.floor((Math.random() * 15) + 1);

        dice.src = `img/dice-${random}.png`;
        dice2.src = `img/dice-${random2}.png`;

        if (currentPlayer === 1) {
            currentScoreA += parseInt(random + random2);
            p1Current.textContent = currentScoreA;
        } else {
            currentScoreB += parseInt(random + random2);
            p2Current.textContent = currentScoreB;
        };


        if (currentPlayer === 1 && (random === 1 || random2 === 1)) {
            swal({
                type: 'warning',
                title: 'Your current score is erased! ',
                text: 'Because you picked an Ace.',
                footer: 'You just ran out your luck.',
            })
            p1Current.textContent = 0;
            currentScoreA = 0;
            setTimeout(function () {
                currentPlayer = 2;
                p2Active.classList.toggle('active');
                p1Active.classList.toggle('active');
            }, 800);
        } else if (currentPlayer === 2 && (random === 1 || random2 === 1)) {

            swal({
                type: 'warning',
                title: 'Your current score is erased! ',
                text: 'Because you picked an Ace.',
                footer: 'You just ran out your luck.',
            })
            p2Current.textContent = 0;
            currentScoreB = 0;
            setTimeout(function () {
                currentPlayer = 1;
                p1Active.classList.toggle('active');
                p2Active.classList.toggle('active');
            }, 800);
        };
    }

});

holdIt.addEventListener('click', function () {
    console.log('hold' + scoreUpdater);
    // if (scoreUpdater === parseInt()||(this.value===parseInt())) {
    //     this.value=parseInt(100)
    //     scoreUpdater = parseInt(100);
    // } 
    if (scoreUpdater === "") {
        scoreUpdater = 100;
    } else {
        scoreUpdater = parseInt(inputSco.value);
    }
    if (!gameOver) {

        if (currentPlayer === 1) {
            finalScoreA += parseInt(p1Current.textContent);
            p1Final.textContent = finalScoreA;
            p1Current.textContent = 0;
            currentScoreA = 0;
            currentPlayer = 2;

            p1Active.classList.toggle('active');
            p2Active.classList.toggle('active');
        } else {
            finalScoreB += parseInt(p2Current.textContent);
            p2Final.textContent = finalScoreB;
            p2Current.textContent = 0;
            currentScoreB = 0;
            currentPlayer = 1;

            p1Active.classList.toggle('active');
            p2Active.classList.toggle('active');
        }
        if (p1Final.textContent >= scoreUpdater) {
            swal({
                type: 'success',
                title: 'Winner!!',
                text: 'You won the game.',
                footer: 'Click \'New game\' to play again.'
            })
            gameOver = true;
            setTimeout(function () {
                wonMsg.textContent = 'P1 Won!';
            }, 100);
            setTimeout(function () {
                wonMsg.textContent = '';
            }, 3500);
        } else if (p2Final.textContent >= scoreUpdater) {
            swal({
                type: 'success',
                title: 'Winner!!',
                text: 'You won the game.',
                footer: 'Click \'New game\' to play again.'
            })
            gameOver = true;
            setTimeout(function () {
                wonMsg.textContent = 'P2 Won!';
            }, 100);
            setTimeout(function () {
                wonMsg.textContent = '';
            }, 3500);
        }

    }
});

newGame.addEventListener('click', function () {
    console.log('new' + scoreUpdater);
    // if (scoreUpdater === parseInt()||(this.value===parseInt())) {
    //     this.value=parseInt(100);
    //     scoreUpdater = parseInt(100);
    // } 

    gameOver = false;
    p1Final.textContent = 0;
    p1Current.textContent = 0;
    p2Final.textContent = 0;
    p2Current.textContent = 0;
    finalScoreA = 0;
    finalScoreB = 0;
    currentScoreA = 0;
    currentScoreB = 0;
    //inputSco.value=100;
    p1Active.classList.remove('active');
    p2Active.classList.remove('active');
    randomStarter = Math.floor((Math.random() * 2) + 1);
    currentPlayer = randomStarter;


    if (currentPlayer === 2) {
        p2Active.classList.add('active');

    } else if (currentPlayer === 1) {
        p1Active.classList.add('active');
    }

});

rules.addEventListener('click', function () {
    swal({

        imageUrl: 'img/therule.png',
        imageHeight: 300,
        imageAlt: 'A tall image'
    });
});

// if (!gameOver) {

// inputSco.addEventListener('input', function () {
//     if (scoreUpdater === "") {
//         scoreUpdater = 100;
//     } else {
//         scoreUpdater = parseInt(this.value) ;
//     }
// });
//}







/* Drafts
//const pic2loc =document.getElementsByTagName('div');
//const pic1loc= document.getElementsByClassName('btn-hold')
//p2CurrentRoundScore.textContent="0";
//let currentScoreB = 0;
//dice.insertAdjacentHTML('afterend','<img src="dice-1.png" alt="Dice2" class="dice">')
//p1Final.textContent=finalScore;
//finalScore+=(p1Final.textContent+p1Final.textContent);
            //currentScoreA = 0;
            //p1Current.textContent =0;
            //currentScoreB = 0;
            //p2Current.textContent =0;
*/

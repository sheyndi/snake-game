// ===== קבצים ומשתנים =====
const audioFood = new Audio('סאונד/eating-sound-effect-36186 (mp3cut (mp3cut.net).mp3');
let container = document.querySelector('#container');
let isRunning = true;
let timer = 200;
let stageIndex = (JSON.parse(localStorage.getItem('stage')) || 1) - 1;
let gameLoopInterval;
let livesLeft = (JSON.parse(localStorage.getItem('livesLeft')));
let snakeHeadClass = 'snake-head-right';
import { stages } from './js/config/stages.js';
import { gameBoard } from './js/core/board.js';
import { initBoard } from './js/core/board.js';
import { eatFood } from './js/features/food.js';
import { addFood } from './js/features/food.js';
import { isEatFood } from './js/features/food.js';
import { initSnake, moveSnake, setDirection, getCurrentHeadIndex, getNextHeadIndex } from './js/core/snake.js';
import { snake } from './js/core/snake.js';
import { isCollisionWithAny } from './js/core/collision.js';
import { gameSettings } from './js/config/stages.js';
let COLS = gameSettings.cols;
// הגדרות פתחים לכל סוג צינור
const pipeOpenings = {
    'pipe-horizontal': { isUpOpen: false, isDownOpen: false, isLeftOpen: true, isRightOpen: true },
    'pipe-vertical': { isUpOpen: true, isDownOpen: true, isLeftOpen: false, isRightOpen: false },
    'pipe-up-right': { isUpOpen: false, isDownOpen: true, isLeftOpen: false, isRightOpen: true },
    'pipe-up-left': { isUpOpen: false, isDownOpen: true, isLeftOpen: true, isRightOpen: false },
    'pipe-down-right': { isUpOpen: true, isDownOpen: false, isLeftOpen: false, isRightOpen: true },
    'pipe-down-left': { isUpOpen: true, isDownOpen: false, isLeftOpen: true, isRightOpen: false },
    'pipe-cross': { isUpOpen: true, isDownOpen: true, isLeftOpen: true, isRightOpen: true },
};

// ===== התחלת שלב =====
function initStage() {
    initBoard(container);
    initSnake();

    const stage = gameSettings;
    container.style.backgroundImage = stage.backgroundImage;
    let time = stage.time;

    // ציור הנחש בלוח
    snake.forEach((index, i) => {
        gameBoard[index].classList.add('snake-body');
        if (i === snake.length - 1) {
            gameBoard[index].classList.add(snakeHeadClass);
        }
    });
    if (stage.stonePositions) {
        stage.stonePositions.forEach(pos => {
            gameBoard[pos].classList.add('stone');
            gameBoard[pos].isStone = true;
        });
    }
    gameBoard[21].classList.add('pipe-horizontal');
    gameBoard[21].pipe = pipeOpenings['pipe-horizontal'];
    gameBoard[22].classList.add('pipe-horizontal');
    gameBoard[22].pipe = pipeOpenings['pipe-horizontal'];
    gameBoard[23].classList.add('pipe-horizontal');
    gameBoard[23].pipe = pipeOpenings['pipe-horizontal'];
    gameBoard[20].classList.add('pipe-up-right');
    gameBoard[20].pipe = pipeOpenings['pipe-up-right'];
    gameBoard[36].classList.add('pipe-vertical');
    gameBoard[36].pipe = pipeOpenings['pipe-vertical'];
    gameBoard[52].classList.add('pipe-vertical');
    gameBoard[52].pipe = pipeOpenings['pipe-vertical'];
    gameLoopInterval = setInterval(gameLoop, time);
    // הוספת אוכל
    addFood();
    addFood();
    addFood();
}

// ===== לולאת המשחק =====
function gameLoop() {
    timer--;
    document.getElementById("timer").textContent = `⏱ Time: ${timer}`;
    const currentHead = getCurrentHeadIndex();
    const newHead = getNextHeadIndex();
    console.log(currentHead, newHead);
    
    if (isCollisionWithAny(currentHead, newHead)) {
        lost_download();
    }
    else {
        moveSnake(newHead);
        // אם אכל
        if (isEatFood(newHead)) {
            eatFood();
        }
    }
    // אם נגמר הזמן
    if (timer === 0) {
        onFinishStage();
    }
}

function onFinishStage() {
    if (snake.length > SCORE_TO_PASS) {
        if (stageIndex === stages.length - 1) {
            window.open("end.html", "_self");
        }
        else {
            clearInterval(gameLoopInterval);
            window.open("success.html", "_self");
            localStorage.setItem('stage', JSON.stringify(stageIndex + 2));
        }
    }
    else {
        window.open("game_over.html", "_self");
    }
}

initStage();

//game overפונקציה שמתקימת כאשר השחקן נפסל ומעבירה ל 
function lost_download() {
    if (livesLeft > 0) {
        livesLeft--;
        document.getElementById("lives").textContent = `❤️ Lives: ${livesLeft}`;
        localStorage.setItem('livesLeft', livesLeft);
        window.location.reload();
    }
    else if (livesLeft <= 0) {
        window.open("game_over.html", "_self");
        return;
    }
}


// ===== מקשי חצים + עצירה =====
document.addEventListener('keydown', (e) => {
    if (e.key === ' ') {
        isRunning ? clearInterval(gameLoopInterval) : gameLoopInterval = setInterval(gameLoop, stages[stageIndex].time);
        isRunning = !isRunning;
    }

    if (e.key === 'ArrowUp') {
        setDirection(-COLS);
    } else if (e.key === 'ArrowDown') {
        setDirection(COLS);
    } else if (e.key === 'ArrowRight') {
        setDirection(1);
    } else if (e.key === 'ArrowLeft') {
        setDirection(-1);
    }
});




// const audiofood = new Audio('סאונד/eating-sound-effect-36186 (mp3cut (mp3cut.net).mp3');

// let snake = [79, 80, 81];

// const stages = [
//     {
//         cols:16,
//         rows:7,
//         color: 'rgb(245, 15, 180)',
//         time: 250,
//         foodImg: "תמונות דגים/lovepik-cream-chocolate-png-image_401144726_wh300-removebg-preview.png",
//         backgroundImage: `url("תמונות רקע/תמונה.JPG")`,
//     },
//     {
//         cols:16,
//         rows:7,
//         color: 'yellow',
//         time: 200,
//         foodImg: "תמונות דגים/an-illustration-of-a-fish-swimming-underwater-vector-made-in_671408_wh860-removebg-preview.png",
//         backgroundImage: `url("תמונות דגים/4043.jpg_wh860.jpg")`,
//     },
//     {
//         cols:16,
//         rows:7,
//         time: 150,
//         foodImg: "תמונות דגים/יתרונות-באכילת-תפוח1-removebg-preview.png",
//         color: 'rgb(86, 39, 12)',
//         backgroundPosition: "center",
//         backgroundImage: `url("תמונות רקע/2617.jpg_wh860.jpg")`,
//     },
//     {
//         cols:16,
//         rows:7,
//         time:100,
//         foodImg:"תמונות דגים/הורדה (7).gif",
//         backgroundImage: `url("תמונות רקע/הורדה (1).gif")`,
//     }
// ]

// let container = document.querySelector('#container');

// let food, lottery, lastRemovedTail , time, background, isRuning = true, taimer = 200, direction = 1, stage = JSON.parse(localStorage.getItem('stage'))-1 || 0,c = 'snake-head-right';

// Stage();

// //פונקציה להגדרת המשחק לפי השלב הנוכחי והתחלתו
// function Stage() {
//     initBoard();
//     //אם השחקן אוחז בשלב הראשון
//     color = stages[stage].color;
//     time = stages[stage].time;
//     food = stages[stage].foodImg;
//     container.style.backgroundImage = stages[stage].backgroundImage;

//     loop = setInterval(play, time);
//     game_board[79].classList.add('snake-body');
//     game_board[80].classList.add('snake-body');
//     game_board[81].classList.add(c);
//     add_food();
//     add_food();
//     add_food();
// }


// function initBoard() {
//     const cols = 16;
//     const rows = 7;
//     let totalCells = cols * rows;
//     for (let i = 0; i < totalCells; i++) {
//         const cell = document.createElement('div');
//         const row = Math.floor(i / (cols));
//         const col = i % cols;
//         row === 0 && cell.classList.add('wall-e');
//         row === rows - 1 && cell.classList.add('wall-t');
//         col === cols - 1 && cell.classList.add('wall-y');
//         col === 0 && cell.classList.add('wall-s');
//         cell.classList.add('cell');
//         container.appendChild(cell);
//     }
//     game_board = document.querySelectorAll('.cell');
// }

// function play() {
//     taimer -= 1;
//     game_board[9].innerHTML = taimer;

//     //בדיקה שהנחש לא יפגע בעצמו בצעד הבא (מתעלם מהמקום של הזנב כי הוא יזוז)
//     let nextHead = snake[snake.length - 1] + direction;
//     let bodyWithoutTail = snake.slice(1); // כל הגוף חוץ מהזנב
//     if (bodyWithoutTail.includes(nextHead)) {
//         lost_download();
//     }
//     // בדיקה אם ראש הנחש בלוח המשחק עלה על קיר
//     if ((game_board[snake[snake.length - 1]].classList.contains('wall-e') && direction == -16) || (game_board[snake[snake.length - 1]].classList.contains('wall-t') && direction == 16) || (game_board[snake[snake.length - 1]].classList.contains('wall-s') && direction == -1) || (game_board[snake[snake.length - 1]].classList.contains('wall-y') && direction == 1)) {
//         lost_download();
//     }
//     //הורדת הסוף של הנחש בלוח המשחק ובמערך
//     game_board[snake[0]].classList.remove('snake-body');
//     lastRemovedTail  = snake.shift();
//     //הוספה למקום אחד אחרי ראש הנחש צבע לפי הכיוון בלוח המשחק
//     game_board[snake[snake.length - 1] ].classList.add('snake-body');
//     game_board[snake[snake.length - 1] ].classList.remove('snake-head-right','snake-head-left','snake-head-up','snake-head-down');
//     game_board[snake[snake.length - 1] + direction].classList.add(c);
//     //הוספת ראש הנחש החדש למערך
//     snake.push(snake[snake.length - 1] + direction)

//     if (game_board[snake[snake.length - 1]].classList.contains('food')) {
//         eat();
//     }

//     //אם הטיימר נגמר
//     if (taimer == 0) {
//         //אם הוא אכל מינימום 10
//         if (snake.length > 12) {
//             //אם השחקן גמר את השלב השלישי
//             if (stage == stages.length - 1) {
//                 window.open("end.html", "_self");
//             }
//             //השלב בלוקל סטורג' יעלה
//             else {
//                 clearInterval(loop)
//                 window.open("success.html", "_self");
//                 JSON.parse(localStorage.setItem('stage', JSON.parse(localStorage.getItem('stage')) + 1));
//             }
//         }
//         //במידה ולא יעבור לgame over
//         else {
//             window.open("game_over.html", "_self")
//         }
//     }
// }

// //div פונקציה להגרלת מקום בלוח המשחק והוספת מזון לאותו


// //אירוע שנעשה כאשר לוחצים על מקש רווח
// document.addEventListener('keydown', (e) => {
//     if (e.key == ' ') {
//         isRuning ? clearInterval(loop) : loop = setInterval(play, time);
//         isRuning = !isRuning;
//     }
// })
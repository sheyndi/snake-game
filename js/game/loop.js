import { getCurrentHeadIndex, getNextHeadIndex, getTailIndex, snake, getSnakeHeadClassName } from "../core/snake.js";
import { isCollisionWithAny } from "../core/collision.js";
import { moveSnake } from "../core/snake.js";
import { isEatFood, eatFood } from "../features/food.js";
import { gameSettings, numberOfStages, stageIndex } from "../config/stages.js";
import { gameBoard, updateCellClasses } from "../core/board.js";
let timer = gameSettings.t || 200;
let livesLeft = (JSON.parse(localStorage.getItem('livesLeft')));

export function gameLoop(gameLoopInterval) {
    timer--;
    document.getElementById("timer").textContent = `⏱ Time: ${timer}`;
    const currentHead = getCurrentHeadIndex();
    const newHead = getNextHeadIndex();
    const tailIndex = getTailIndex();

    if (isCollisionWithAny(currentHead, newHead, tailIndex)) {
        updateCellClasses(getCurrentHeadIndex(), [getSnakeHeadClassName()], [
            'snake-head-right',
            'snake-head-left',
            'snake-head-up',
            'snake-head-down']);
        handleCollision(gameBoard[currentHead]);
        setTimeout(() => {
            lost_download();
        }, 300);
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
        onFinishStage(gameLoopInterval);
    }
}

function lost_download() {
    if (livesLeft > 0) {
        livesLeft--;
        document.getElementById("lives").textContent = `❤️ Lives: ${livesLeft}`;
        localStorage.setItem('livesLeft', livesLeft);
        location.replace(location.href)
    }
    else if (livesLeft <= 0) {
        location.replace("game_over.html");
        return;
    }
}

function onFinishStage(gameLoopInterval) {
    if (snake.length > gameSettings.minFoodToPass) {
        if (stageIndex === numberOfStages) {
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

function handleCollision(cellElement) {
    const particlesCount = 3; // עדיין 2-3 חלקיקים עדינים

    for (let i = 0; i < particlesCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('collision-particle');

        // כיוונים אקראיים מכל כיוון
        const angle = Math.random() * 2 * Math.PI; // זווית אקראית בין 0 ל־360°
        const distance = Math.random() * 100 + 50; // מרחק אקראי
        const x = Math.cos(angle) * distance + 'px';
        const y = Math.sin(angle) * distance + 'px';

        particle.style.setProperty('--x', x);
        particle.style.setProperty('--y', y);
        particle.style.setProperty('--rotate', Math.random() * 360 + 'deg'); // סיבוב אקראי

        cellElement.appendChild(particle);

        setTimeout(() => particle.remove(), 700); // זמן שווה לאורך האנימציה
    }
}
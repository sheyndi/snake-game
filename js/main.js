import { initBoard } from "./core/board.js";
import { initSnake, setDirection } from "./core/snake.js";
import { gameLoop } from "./game/loop.js";
import { gameSettings } from "./config/stages.js";
import { addFood } from "./features/food.js";

const { cols } = gameSettings;

let isRunning = false;
let lastTime = 0;
let accumulatedTime = 0;
let delay = gameSettings.time;
let directionQueue = [];

// אתחול המשחק
initBoard();
initSnake();
addFood();
addFood();
addFood();

// ======== לולאת המשחק הראשית ========
function gameLoopWrapper(timestamp) {
  if (!isRunning) return;

  const delta = timestamp - lastTime;
  lastTime = timestamp;
  accumulatedTime += delta;

  // להריץ צעד רק כשהגיע הזמן
  if (accumulatedTime >= delay) {
    accumulatedTime = 0;
    gameLoop();
    directionQueue.length ? setDirection(directionQueue.shift()) : null;
  }

  requestAnimationFrame(gameLoopWrapper);
}

// ======== אירועי מקלדת ========
document.addEventListener('keydown', (e) => {
  const directions = {
    ArrowUp: -cols,
    ArrowDown: cols,
    ArrowRight: 1,
    ArrowLeft: -1
  };

  // מקש רווח — הפעלה/עצירה
  if (e.key === ' ') {
    isRunning = !isRunning;
    if (isRunning) {
      lastTime = performance.now();
      requestAnimationFrame(gameLoopWrapper);
    }
    return;
  }

  // מקשי חיצים
  if (directions[e.key] !== undefined) {
    if (directionQueue.length === 0) {
        directionQueue.push(directions[e.key]);
        setDirection(directionQueue[0]);
    }
    if (directionQueue.length === 1) {
      directionQueue.shift();
      directionQueue.push(directions[e.key]);
    }


    if (!isRunning) {
      // אם המשחק עוד לא התחיל – להתחיל אותו
      isRunning = true;
      lastTime = performance.now();
      requestAnimationFrame(gameLoopWrapper);
    } 
  }
});

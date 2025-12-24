import { gameBoard } from "./board.js";
import { gameSettings } from "../config/stages.js";
import { direction } from "./snake.js";
let COLS = gameSettings.cols;
let ROWS = gameSettings.rows;

export function isCollisionWithWall(currentHead) {

    const cell = gameBoard[currentHead];

    return (
        (cell.col === 0 && direction === -1) ||                      // שמאלה
        (cell.col === COLS - 1 && direction === 1) ||                // ימינה
        (cell.row === 0 && direction === -COLS) ||                   // למעלה
        (cell.row === ROWS - 1 && direction === COLS)                // למטה
    );
}

export function isCollisionWithSelf(newHead, tailIndex) {    
    return gameBoard[newHead].classList.contains('snake-body') && newHead !== tailIndex;
}

export function isCollisionWithStone(newHead) {
    return gameBoard[newHead].isStone == true;
}

export function isCollisionWithPipe(currentHead, newHead) {
    if (gameBoard[currentHead].pipe) {            // בדוק האם הכיוון שממנו יוצא פתוח
        return direction == 1 && gameBoard[currentHead].pipe.isRightOpen == false ||
            direction === -1 && gameBoard[currentHead].pipe.isLeftOpen == false ||
            direction === -COLS && gameBoard[currentHead].pipe.isUpOpen == false ||
            direction === COLS && gameBoard[currentHead].pipe.isDownOpen == false;
    }
    if (gameBoard[newHead].pipe) {            // בדוק האם הכיוון שממנו נכנס פתוח
        return direction == 1 && gameBoard[newHead].pipe.isLeftOpen == false ||
            direction === -1 && gameBoard[newHead].pipe.isRightOpen == false ||
            direction === -COLS && gameBoard[newHead].pipe.isDownOpen == false ||
            direction === COLS && gameBoard[newHead].pipe.isUpOpen == false;
    }
    return false;
}

export function isCollisionWithAny(currentHead, newHead, tailIndex) {

    return isCollisionWithWall(currentHead, direction) ||
        isCollisionWithSelf(newHead, tailIndex) ||
        isCollisionWithStone(newHead) ||
        isCollisionWithPipe(currentHead, newHead, direction);
}
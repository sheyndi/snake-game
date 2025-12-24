import { updateCellClasses } from "./board.js";
import { gameSettings } from "../config/stages.js";

let lastRemovedTail = null;
let snakeHeadClass = 'snake-head-right';
const COLS = gameSettings.cols;
const ROWS = gameSettings.rows;
export let snake = [];
export let direction = 1;

export function initSnake() {
    let middleCell = ROWS % 2 == 0 ? Math.floor(COLS * ROWS / 2) : Math.floor((COLS * (ROWS - 1)) / 2) + Math.floor((COLS - 3) / 2);
    snake = [middleCell, middleCell + 1, middleCell + 2];

    // ציור הנחש
    snake.forEach((index) => {
        updateCellClasses(index, ['snake-body']);
    });
    updateCellClasses(snake[snake.length - 1], [snakeHeadClass]);
}

export function moveSnake() {
    const newHead = snake[snake.length - 1] + direction;
    snake.push(newHead);
    updateCellClasses(newHead, [snakeHeadClass]);
    
    updateCellClasses(snake[0], [], ['snake-body']);
    lastRemovedTail = snake.shift();

    const prevHeadIndex = snake[snake.length - 2];
    updateCellClasses(prevHeadIndex, ['snake-body'], [
        'snake-head-right',
        'snake-head-left',
        'snake-head-up',
        'snake-head-down']);
}

export function growSnake() {
    updateCellClasses(lastRemovedTail, ['snake-body']);
    snake.unshift(lastRemovedTail);
}

export function getCurrentHeadIndex() {
    return snake[snake.length - 1];
}

export function getNextHeadIndex() {
    return getCurrentHeadIndex() + direction;
}

export function getTailIndex() {
    return snake[0];
}

export function getSnakeHeadClassName() {
    return snakeHeadClass;
}

function reverseSnake() {
    updateCellClasses(getCurrentHeadIndex(), ['snake-body'], [
        'snake-head-right',
        'snake-head-left',
        'snake-head-up',
        'snake-head-down']);
    snake.reverse();
}

export function setDirection(newDirection) {
    switch (newDirection) {
        case 1:
            snakeHeadClass = 'snake-head-right';
            direction == -1 && reverseSnake();
            direction = 1;
            break;
        case -1:
            snakeHeadClass = 'snake-head-left';
            direction == 1 && reverseSnake();
            direction = -1;
            break;
        case -COLS:
            snakeHeadClass = 'snake-head-up';
            direction == COLS && reverseSnake();
            direction = -COLS;
            break;
        case COLS:
            snakeHeadClass = 'snake-head-down';
            direction == -COLS && reverseSnake();
            direction = COLS;
            break;
    }
}
import { gameBoard } from '../core/board.js';
import { growSnake } from '../core/snake.js';
import { snake } from '../core/snake.js';
import { gameSettings } from '../config/stages.js';

export function addFood() {
    let index;
    do {
        index = Math.floor(Math.random() * gameBoard.length);
    }
    while (snake.includes(index) || gameBoard[index].classList.contains('food') || gameBoard[index].classList.contains('stone')) 

    let img = document.createElement('img');
    img.src = gameSettings.foodImg;
    let food = document.createElement('div');
    food.classList.add('food-img');
    food.appendChild(img);
    gameBoard[index].appendChild(food);
    gameBoard[index].classList.add('food');
}

export function eatFood() {
    growSnake();
    gameBoard[snake[snake.length - 1]].childNodes[0].remove();
    gameBoard[snake[snake.length - 1]].classList.remove('food');
    addFood();
}

export function isEatFood(index){
    return gameBoard[index].classList.contains('food');
}
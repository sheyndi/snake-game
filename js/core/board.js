import { gameSettings } from "../config/stages.js";
import { drawPipesOnBoard } from "../features/pipes.js";
export let gameBoard = [];
const { cols, rows } = gameSettings;
let container = document.querySelector('#container');

export function initBoard() {
  container.style.backgroundImage = gameSettings.backgroundImage;
  document.getElementById("lives").textContent = `❤️ Lives: ${localStorage.getItem('livesLeft') || 3}`;
  const totalCells = cols * rows;
  for (let i = 0; i < totalCells; i++) {
    const cell = document.createElement('div');
    const row = Math.floor(i / cols);
    const col = i % cols;

    cell.row = row;
    cell.col = col;
    console.log(row, col);


    cell.classList.add('cell');
    container.appendChild(cell);
  }
  container.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
  container.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

  gameBoard = document.querySelectorAll('.cell');

  if (gameSettings.stonePositions) {
        gameSettings.stonePositions.forEach(pos => {
            gameBoard[pos].classList.add('stone');
            gameBoard[pos].isStone = true;
        });
    }
    drawPipesOnBoard();
}

export function updateCellClasses(index, classesToAdd = [], classesToRemove = []) {

  const cell = gameBoard[index];
  classesToRemove.forEach(cls => cell.classList.remove(cls));
  classesToAdd.forEach(cls => cell.classList.add(cls));
}
import { gameSettings } from "../config/stages.js";
import { gameBoard } from "../core/board.js";

const pipeOpenings = {
    'pipe-horizontal': { isUpOpen: false, isDownOpen: false, isLeftOpen: true, isRightOpen: true },
    'pipe-vertical': { isUpOpen: true, isDownOpen: true, isLeftOpen: false, isRightOpen: false },
    'pipe-up-right': { isUpOpen: true, isDownOpen: false, isLeftOpen: false, isRightOpen: true },
    'pipe-up-left': { isUpOpen: true, isDownOpen: false, isLeftOpen: true, isRightOpen: false },
    'pipe-down-right': { isUpOpen: false, isDownOpen: true, isLeftOpen: false, isRightOpen: true },
    'pipe-down-left': { isUpOpen: false, isDownOpen: true, isLeftOpen: true, isRightOpen: false },
    'pipe-cross': { isUpOpen: true, isDownOpen: true, isLeftOpen: true, isRightOpen: true },
    'pipe-u-d-r': { isUpOpen: true, isDownOpen: true, isLeftOpen: false, isRightOpen: true },
    'pipe-u-d-l': { isUpOpen: true, isDownOpen: true, isLeftOpen: true, isRightOpen: false },
    'pipe-u-l-r': { isUpOpen: true, isDownOpen: false, isLeftOpen: true, isRightOpen: true },
    'pipe-d-r-l': { isUpOpen: false, isDownOpen: true, isLeftOpen: true, isRightOpen: true },
};

export function drawPipesOnBoard() {
    gameSettings.pipePositions.forEach(pipeData => {
        const cell = gameBoard[pipeData.position];
        const pipeType = pipeData.type;
        cell.classList.add(pipeType);
        cell.pipe = pipeOpenings[pipeType];
    });
}


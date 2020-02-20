import config from './config';

const { GRID_SIZE } = config;

export function updateScore(score, rowIndex, colIndex, player) {
	const updatedScore = [...score];
	const playerIncrement = player === '1' ? 1 : -1;

	updatedScore[rowIndex] += playerIncrement;
	updatedScore[GRID_SIZE + colIndex] += playerIncrement;

	if (rowIndex === colIndex) {
		updatedScore[GRID_SIZE * 2] += playerIncrement;
	}
	else if ((GRID_SIZE - 1 - colIndex) === rowIndex) {
		updatedScore[GRID_SIZE + 1] += playerIncrement;
	}

	return updatedScore;
}

export function checkWinner(score) {
	if (score.find(x => x === GRID_SIZE)) {
		return '1';
	}
	if (score.find(x => x === -GRID_SIZE)) {
		return '2';
	}

	return null;
}
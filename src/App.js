import React from 'react';
import config from './config';
import './style.scss';
import { updateScore, checkWinner } from './helpers'

const { GRID_SIZE, PLAYER } = config;
const initialState = {
	data: Array(GRID_SIZE * GRID_SIZE).fill(''),
	score: Array(GRID_SIZE * 2 + 2).fill(0),
	player: '1',
	winner: null
}

class App extends React.Component {
	constructor() {
		super();

		this.state = {
			...initialState,
			winningCount: {
				'1': 0,
				'2': 0
			}
		};
	}

	start() {
		this.setState(initialState)
	}

	onInsertSymbol(index) {
		const { data, score, player, winningCount } = this.state;

		const rowIndex = parseInt(index / GRID_SIZE);
		const colIndex = index % (GRID_SIZE);
		const updatedScore = updateScore(score, rowIndex, colIndex, player);
		const winner = checkWinner(updatedScore);

		this.setState({
			player: player === '1' ? '2' : '1',
			data: data.map((d, i) => {
				if (i === index) {
					return PLAYER[player];
				}
				return d;
			}),
			score: updatedScore,
			...(winner && {
				winner,
				winningCount: {
					...winningCount,
					[winner]: winningCount[winner] + 1
				}
			})
		}, () => {
			if (winner) {
				alert(`Winner : Player ${winner}`);
				this.start();
			}
		});
	}

	renderPlayer(no) {
		const { player, winningCount } = this.state;

		return (
			<div className="player">
				<h4 style={{ color: player === no ? 'green' : '#fff' }}>
					Player {no} ({PLAYER[no]})
						</h4>
				<h3>
					{winningCount[no]}
				</h3>
			</div>
		);
	}

	renderBox() {
		const { data } = this.state;

		return (
			<ul className="container">
				{
					data.map((d, index) => {
						return (
							<li key={index} className="list" onClick={() => !data[index] && this.onInsertSymbol(index)}>{d}</li>
						)
					})
				}
			</ul>
		);
	}

	render() {
		return (
			<div className="page">
				<div className="app">
					{this.renderPlayer('1')}
					{this.renderBox()}
					{this.renderPlayer('2')}
				</div>
				<div className="actions">
					<button onClick={() => this.start()}>RESTART</button>
				</div>
			</div>

		);
	}
}

export default App;
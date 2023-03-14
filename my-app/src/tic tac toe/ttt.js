import React, { Component } from "react";
import "./ttt.css";

class Square extends Component {
    render() {
        const { value, handleClick, index, isFocused } = this.props;
        console.log(isFocused);
        return (
            <button
                className={`squar ${isFocused ? "focused" : ""}`}
                onClick={() => handleClick(index)}
                tabIndex={0}

            >
                {value}
            </button>
        );
    }
}
class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            board: Array(9).fill(""),
            turn: "X",
            winner: "",
            index: 0, // добавлено для отслеживания индекса выбранной клетки
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.board !== this.state.board) {
            this.checkWinner();
        }
    }

    checkWinner = () => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        let j = 0;
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            const { board } = this.state;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                j = 1;
                this.setState({ winner: board[a] });
            }
        }
        setTimeout(() => {
            const { board } = this.state;
            if (!board.includes("") && j === 0) {
                this.setState({ winner: "Ничья" });
            }
        }, 40);
    };

    handleClick = (index) => {
        if (this.state.winner === "") {
            const { board, turn } = this.state;
            if (index < 0 || index > 9 || board[index]) return;
            const newBoard = [...board];
            newBoard.splice(index, 1, turn);
            const newTurn = turn === "X" ? "O" : "X";
            this.setState({ board: newBoard, turn: newTurn });
        }
    };

    gameRestart = () => {
        this.setState({ board: Array(9).fill(""), turn: "X", winner: "" });
    };
    handleKeyDown = (event) => {
        const { board } = this.state;
        const index = this.state.index; // получаем текущий индекс выбранной клетки

        let newIndex;
        switch (event.key) {
            case "ArrowUp":
                newIndex = index - 3;
                break;
            case "ArrowDown":
                newIndex = index + 3;
                break;
            case "ArrowLeft":
                newIndex = index - 1;
                break;
            case "ArrowRight":
                newIndex = index + 1;
                break;
            case "Enter":
                this.handleClick(index);
                return;
            default:
                return;
        }
console.log(newIndex);
        if (newIndex >= 0 && newIndex < 9 && !board[newIndex]) {
            this.setState({ index: newIndex });
        }
    };

    render() {
        const { board, index } = this.state;

        return (
            <section className="section" onKeyDown={this.handleKeyDown} tabIndex={0}>
                <div className="card1">
                    <div className="container">
                        <div className="board-wrapper">
                            {this.state.winner && <h2>Победитель: {this.state.winner} </h2>}
                            {!this.state.winner && <h2>Ходит: {this.state.turn} </h2>}
                            <div className="board">
                                {board.map((elem, i) => (
                                    <Square
                                        key={i}
                                        value={elem}
                                        handleClick={this.handleClick}
                                        index={i}
                                        isFocused={i === index}
                                    />
                                ))}
                                <div className="buttonrest">
                                    <button onClick={this.gameRestart}>Очистить поле</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Board;
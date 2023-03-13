import React, { Component } from "react";
import "./ttt.css";

class Square extends Component {
    render() {
        const { value, handleClick, index } = this.props;

        return (
            <button className="squar" onClick={() => handleClick(index)}>
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
                setTimeout(() => {
                    j = 1;
                    alert(`Победил ${board[a]}`);
                    this.gameRestart();
                }, 20);
            }
        }
        setTimeout(() => {
            const { board } = this.state;
            if (!board.includes("") && j === 0) {
                console.log(board);
                alert(`ничья`);
                this.gameRestart();
            }
        }, 40);
    };

    handleClick = (index) => {
        const { board, turn } = this.state;
        if (index < 0 || index > 9 || board[index]) return;
        const newBoard = [...board];
        newBoard.splice(index, 1, turn);
        const newTurn = turn === "X" ? "O" : "X";
        this.setState({ board: newBoard, turn: newTurn });
    };

    gameRestart = () => {
        this.setState({ board: Array(9).fill(""), turn: "X" });
    };

    render() {
        const { board } = this.state;

        return (
            <section className="section">
                <div className="card1">
                    <div className="container">
                        <div className="board-wrapper">
                            <div className="board">
                                {board.map((elem, index) => (
                                    <Square
                                        key={index}
                                        value={elem}
                                        handleClick={this.handleClick}
                                        index={index}
                                    />
                                ))}
                            </div>
                            {/*<div className="button-div">*/}
                            {/*    <button onClick={game_restart}>Очистить поле</button>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Board;

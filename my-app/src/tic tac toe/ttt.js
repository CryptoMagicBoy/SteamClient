import React, { useState } from "react";
import "./ttt.css";
import Button from 'react-bootstrap/Button';
const Square = ({value, handleClick, index}) => {


    return (<button className="squar" onClick={() => handleClick(index)}>
        {value}
    </button>)
}

const Board = () => {

    const [board, setBoard] = React.useState(Array(9).fill(''))
    const [turn, setTurn] = React.useState('X')
    //const [winner, setwinner] = React.useState()

    React.useEffect(() => {
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

        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                // setwinner(board[a]);
                setTimeout(() => {
                    alert(`Победил ${board[a]}`);
                    game_restart();

                }, 200);

            }

        }
    }, [board])

    const handleclick = (index) => {
        console.log({index})
        if (index < 0 || index > 9 || board[index]) return
        const newboard = [...board]
        newboard.splice(index,1,turn)
        setBoard(newboard)
        const newturn = turn === 'X' ? 'O' : 'X'
        setTurn(newturn)
    }


    const game_restart = () => {
        setBoard(Array(9).fill(''))
        setTurn("X")
        // setwinner('')
    }


    return(

        <section className="section">
            <div className="card1">
                <div className='container'>
                    {/*{winner && <h1 className="text-center">{winner}</h1>}*/}
                    <div className='board-wrapper'>
                        <div className='board'>
                            {board.map((elem, index) => (
                                <Square value={elem}  handleClick={handleclick} index={index}/> //key ={index}
                            ) ) }
                        </div>
                        {/*<div className="button-div">*/}
                        {/*    <button onClick={game_restart}>Очистить поле</button>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
        </section>
    )

}



// const App = () => {
//     return <Board/>
// };

export default Board;

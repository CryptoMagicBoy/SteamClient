import React from 'react';
import "./gomoku.css";
class Game extends React.Component {

    constructor(props) {
        super(props);

        this.stoneRadius = 25;
        this.stoneDiameter = this.stoneRadius * 2;

        this.init = this.init.bind(this);
        this.addGo = this.addGo.bind(this);
        this.restartGame = this.restartGame.bind(this);

        this.history = [];
        this.state = {
            blackStone: true,
            gameOver: false,
            gameState: 'Next: Black Stone'
        };
    }

    componentDidMount() {
        const goBoard = document.getElementById('goBoard');
        const context = goBoard.getContext('2d');
        //context.strokeStyle = "#2a376c";

        // Отрисовка доски го
        for (let i = 0; i < 15; i++) {
            context.moveTo(0, 50 * i);
            context.lineTo(700, 50 * i);
            context.moveTo(50 * i, 0);
            context.lineTo(50 * i, 700);
        }
        context.stroke();

        // Настройка координат мыши
        this.rect = {};
        this.goBoardX = goBoard.offsetLeft;
        this.goBoardY = goBoard.offsetTop;

        this.init();
    }


    init() {
        var goBoard = document.getElementById('goBoard');
        //при нажатии на доску будет добавлен камень
        goBoard.addEventListener('mousedown', this.addGo, false);
    }


    restartGame() {
        // Очищаем историю ходов и сбрасываем состояние игры
        this.history = [];
        this.setState({
            blackStone: true,
            gameOver: false,
            gameState: 'Next: Black Stone'
        });

        // Получаем элемент холста и его контекст
        const goBoard = document.getElementById('goBoard');
        const context = goBoard.getContext('2d');

        // Очищаем холст и отрисовываем доску
        context.clearRect(0, 0, goBoard.width, goBoard.height);
        for (let i = 0; i < 15; i++) {
            context.moveTo(0, 50 * i);
            context.lineTo(700, 50 * i);
            context.moveTo(50 * i, 0);
            context.lineTo(50 * i, 700);
        }
        context.stroke();

        // Добавляем обработчик события нажатия на доску
        goBoard.addEventListener('mousedown', this.addGo, false);
    }

    gameScore(isPlayerOne) {
        // Если на доске больше нет свободных ячеек, объявляем ничью
        if (this.history.length === 13 * 13) {
            this.setState({
                gameOver: true,
                gameState: 'Draw!'
            });
            return;
        }

        // Отбираем камни игрока
        const playerStones = this.history.filter(stone => stone.isBlackStone === isPlayerOne);

        // Сортируем камни по координате x
        playerStones.sort((a, b) => a.x - b.x);

        // Проверяем выигрыш по горизонтали
        for (let i = 0; i < playerStones.length; i++) {
            let count = 1;
            const currentStone = playerStones[i];
            for (let j = i + 1; j < playerStones.length; j++) {
                const nextStone = playerStones[j];
                if (nextStone.y === currentStone.y && nextStone.x === currentStone.x + this.stoneDiameter * count) {
                    count++;
                } else {
                    break;
                }
            }
            if (count >= 5) {
                const winner = isPlayerOne ? 'Black Stone' : 'White Stone';
                this.setState({
                    gameOver: true,
                    gameState: `${winner} Win!`
                });
                return;
            }
        }

        // Сортируем камни по координате y
        playerStones.sort((a, b) => a.y - b.y);

        // Проверяем выигрыш по вертикали
        for (let i = 0; i < playerStones.length; i++) {
            let count = 1;
            const currentStone = playerStones[i];
            for (let j = i + 1; j < playerStones.length; j++) {
                const nextStone = playerStones[j];
                if (nextStone.x === currentStone.x && nextStone.y === currentStone.y + this.stoneDiameter * count) {
                    count++;
                } else {
                    break;
                }
            }
            if (count >= 5) {
                const winner = isPlayerOne ? 'Black Stone' : 'White Stone';
                this.setState({
                    gameOver: true,
                    gameState: `${winner} Win!`
                });
                // setTimeout(() => {
                //     console.log("sdfdfsdfdfdsf");
                //     let res = window.confirm(`${winner} Win!\nСбросить доску`);
                //     if (res){
                //         this.restartGame()
                //     }
                // }, 40);
                return;
            }
        }
// Сортируем камни по координате x+y
        playerStones.sort((a, b) => a.x + a.y - (b.x + b.y));

// Проверяем выигрыш по диагонали (слева направо)
        for (let i = 0; i < playerStones.length; i++) {
            let count = 1;
            const currentStone = playerStones[i];
            for (let j = i + 1; j < playerStones.length; j++) {
                const nextStone = playerStones[j];
                if (nextStone.x === currentStone.x + this.stoneDiameter * count && nextStone.y === currentStone.y + this.stoneDiameter * count) {
                    count++;
                } else {
                    break;
                }
            }
            if (count >= 5) {
                const winner = isPlayerOne ? 'Black Stone' : 'White Stone';
                this.setState({
                    gameOver: true,
                    gameState: `${winner} Win!`

            });
                // setTimeout(() => {
                //     console.log("sdfdfsdfdfdsf");
                //     let res = window.confirm(`${winner} Win!\nСбросить доску`);
                //     if (res){
                //         this.restartGame()
                //     }
                // }, 40);
                return;
            }
        }

// Проверяем выигрыш по диагонали (справа налево)
        playerStones.sort((a, b) => a.x - a.y - (b.x - b.y));
        for (let i = 0; i < playerStones.length; i++) {
            let count = 1;
            const currentStone = playerStones[i];
            for (let j = i + 1; j < playerStones.length; j++) {
                const nextStone = playerStones[j];
                if (nextStone.x === currentStone.x + this.stoneDiameter * count && nextStone.y === currentStone.y - this.stoneDiameter * count) {
                    count++;
                } else {
                    break;
                }
            }
            if (count >= 5) {
                const winner = isPlayerOne ? 'Black Stone' : 'White Stone';
                this.setState({
                    gameOver: true,
                    gameState: `${winner} Win!`
            });
//                 setTimeout(() => {
//                     console.log("sdfdfsdfdfdsf");
// let res = window.confirm(`${winner} Win!\nСбросить доску`);
// if (res){
//     this.restartGame()
// }
//                 }, 40);
                return;
            }
         }

    }


    addGo(event) {
        // Получаем координаты курсора мыши
        const mouseX = event.pageX - 30;
        const mouseY = event.pageY - 30;

        // Вычитаем координаты игрового поля для получения точных координат на игровом поле
        const goBoard = document.getElementById('goBoard');
        const rect = goBoard.getBoundingClientRect();
        const goBoardX = rect.x;
        const goBoardY = rect.y;
        const stoneDiameter = 50;
        const stoneRadius = stoneDiameter / 2;
        const stoneX = mouseX - goBoardX - 1;
        const stoneY = mouseY - goBoardY - 2;

        // Округляем координаты к ближайшей позиции камня на игровом поле
        const roundedX = Math.round(stoneX / stoneDiameter) * stoneDiameter + stoneRadius;
        const roundedY = Math.round(stoneY / stoneDiameter) * stoneDiameter + stoneRadius;

        // Проверяем, находятся ли координаты в пределах игрового поля
        const isValid = roundedX > 0 && roundedX < 700 && roundedY > 0 && roundedY < 700;

        if (isValid && !this.state.gameOver) {
            // Проверяем, что на этом месте нет камня
            const isAlreadyPlaced = this.history.some((historyItem) => historyItem.x === roundedX && historyItem.y === roundedY);

            if (isAlreadyPlaced) {
                console.log("don't overwrite");
            } else {
                // Записываем ход игрока
                const isBlackStone = this.state.blackStone;
                const historyItem = { x: roundedX, y: roundedY, isBlackStone };
                this.history.push(historyItem);

                // Рисуем камень на игровом поле
                const context = goBoard.getContext('2d');
                context.beginPath();
                context.arc(roundedX, roundedY, stoneRadius, 0, 2 * Math.PI);

                if (isBlackStone) {
                    context.fillStyle = 'black';
                } else {
                    context.fillStyle = 'white';
                }

                context.fill();
                context.stroke();

                // Обновляем состояние игры
                const nextStone = isBlackStone ? 'White Stone' : 'Black Stone';
                this.setState({
                    blackStone: !isBlackStone,
                    gameState: `Next: ${nextStone}`,
                });

                // Подсчитываем очки игроков
                this.gameScore(true); // Очки игрока 1 (черные камни)
                if (!this.state.gameOver) {
                    this.gameScore(false); // Очки игрока 2 (белые камни)
                }
            }
        }
    }



    render() {
        return (
            <container>
            <section className="section">
                <div className="card2">
                    <div className="container">
                        <div className="board-wrapper">
                            <div className="game">
                                <div className="game-board">
                                    <div className="status-txt">
                                        {this.state.gameState}
                                    </div>
                                    <canvas id="goBoard" width="700" height="700" />
                                </div>
                            </div>
                        </div>
                        <div className="buttik">
                            <button onClick={this.restartGame}>Очистить поле</button>
                        </div>
                    </div>
                </div>
            </section>
            </container>
        );
    }
}

export default Game;
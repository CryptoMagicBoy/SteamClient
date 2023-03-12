import React,{ Component } from 'react';

class AlphaButtons extends Component{
    render() {
        return (
            <div>
                {
                    "абвгдеёжзийклмнопрстуфхцчшщъыьэюя".split("").map(ltr => (
                    <button
                        value={ltr}
                        onClick={this.props.handleGuess}
                        disabled={this.props.guessedBtns.has(ltr)}
                        key={ltr}
                    >
                        {ltr}
                    </button>
                    ))
                }
            </div>
        )
    }
}

export default AlphaButtons
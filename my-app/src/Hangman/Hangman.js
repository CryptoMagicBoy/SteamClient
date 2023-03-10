import React, { Component } from "react";
import { getUserWord } from "./words";
import "./Hangman.css";
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";
import AlphaButtons from "./AlphaButtons";


class Hangman extends Component {

  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6]
  };

  constructor(props) {
    super(props);
    let answer = localStorage.getItem("answer");
    if (!answer) {
      answer = getUserWord();
      localStorage.setItem("answer", answer);
    }
    this.state = {nWrong: 0, guessed: new Set(), answer: answer};
    this.handleGuess = this.handleGuess.bind(this);
    console.log(this.state.answer);

  }
  componentDidMount() {
    localStorage.removeItem("answer");
  }

  guessedWord() {
    return this.state.answer
      .split("")
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  handleGuess(evt) {
    let ltr = evt.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
    }));
  }

  reset=()=>{
    this.setState({ nWrong: 0, guessed: new Set(), answer: getUserWord() })
  }
  getWordNbtns(){
    let testArr = this.state.answer.split('')
                  .filter(ltr => ! this.state.guessed.has(ltr))
    const isWinner = !testArr.length
    const gameOver = this.state.nWrong >= this.props.maxWrong
    let wordNbtns=''
    if(isWinner){    // display 'You won'
      wordNbtns = 
      <div>
        <h2 style={{ color: '#fff' }}>You WON</h2>
      </div>
    }
    else if(gameOver){  // display 'You lose'
      wordNbtns = 
      <div>
        <p style={{ color: '#fff' }} className='Hangman-word'>{this.state.answer}</p>
        <h3 style={{ color: '#fff' }}>You Lose!</h3>
      </div>
  
    }
    else {
      wordNbtns = 
      <div>
        <p style={{ color: '#fff' }} className='Hangman-word'>{this.guessedWord()}</p>
        <p className='Hangman-btns'><AlphaButtons handleGuess={this.handleGuess} guessedBtns={this.state.guessed} /></p>
      </div>
    }
    return wordNbtns
  }
  render() {

    return (
      <div className='Hangman'>
        <img src={this.props.images[this.state.nWrong]} alt={`${this.state.nWrong}/${this.props.maxWrong}`} style={{ color: '#fff' }} />
        {this.getWordNbtns()}
        <p style={{ color: '#fff' }}>???????????????????? ????????????: {this.state.nWrong}</p>

        <button onClick={this.reset}>?????????? ???? ??????????, ????????</button>
      </div>
    );
  }
}

export default Hangman;

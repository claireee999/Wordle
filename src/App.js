import React, { useEffect, useState } from 'react';
import './App.css';
import Keyboard from './components/Keyboard';
import SingleGuess from './components/SingleGuess';
import { compare } from './util';
import { keyColors } from './keyColors';
import { Color } from './enum';

function App() {
  const [guesses, setGuesses] = useState([]);
  const len = 5;

  const [answer, setAnswer] = useState('');
  const [keyboard, setKeyboard] = useState(keyColors);
  
  useEffect(() => {
  fetch(`https://wordsapi-65da506d4353.herokuapp.com/random-word`)
  .then(response => response.json())
  .then(data => { 
                  setAnswer(data.word.toUpperCase()); 
                  //console.log(data.word)})
  .catch(error => console.error(error));
},[])


useEffect(() => {
  compare(guesses[guesses.length -1], answer).forEach((item) => {
    //console.log(item);
    setKeyboard(
        prev => {
          if (prev[item.char] === Color.CORRECT) {
            return prev;
          } else if (prev[item.char] === Color.WRONGPOS && item.color === Color.NOTEXIST) {
            return {...prev, [item.char]:Color.WRONGPOS};
          } else{
            return {...prev, [item.char]:item.color};
          }
        } 
      )
    
},[guesses])})



  return (
    <div className="App">
       {guesses.map((guess) => (
        <SingleGuess results={compare(guess, answer)} setKeyboard={setKeyboard}/>
      ))}

      <Keyboard setGuesses={setGuesses} len={len} keyboard={keyboard}/>
     
    </div>
  );
}

export default App;

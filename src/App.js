import React, { useState } from 'react';
import './App.css';
import Keyboard from './components/Keyboard';
import SingleGuess from './components/SingleGuess';
import { compare } from './util';

function App() {
  const [guesses, setGuesses] = useState([]);
  const len = 5;
  console.log(guesses)


  return (
    <div className="App">
       {guesses.map((guess) => (
        <SingleGuess results={compare(() => guess)} />
      ))}

      <Keyboard setGuesses={setGuesses} len={len}/>
     
    </div>
  );
}

export default App;

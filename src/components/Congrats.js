import React, { useState , useEffect } from 'react';
import "./style.css";

//<p>You beat 0% of players on this word.</p>

const Congrats = (props) => {
    return(
        <>  
            <div className="overlay" ></div>
            <div className="congrats">
                <h2>Congratulations!</h2>
                <p>You guessed the word in {props.tries} tries.</p>
                
                <button onClick={props.restart}>Try Another</button>
            </div>
        </>
    );
};

export default Congrats;

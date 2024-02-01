import React, { useState , useEffect } from 'react';
import { Color } from '../enum.js'
import { compare } from '../util.js';
import "./style.css";

const SingleGuess = (props) => {
    return(
        <div className="display-single-guess">
        {props.results.map(({char, color}) => (
            <button style={{ backgroundColor: `${color}`}} className="display-button" disabled>
            {char}
          </button>
        ))}
        </div>
    );
};

export default SingleGuess;

import React, { useState , useEffect } from 'react';
import { Color } from '../enum.js'
import { compare } from '../util.js';

const SingleGuess = (props) => {
    console.log(props.results)

    
    return(
        <>
        {props.results.map(({char, color}) => (
            <label htmlFor="textBox" color={color}>{char}</label>

        ))}
        </>
    );

};

export default SingleGuess;

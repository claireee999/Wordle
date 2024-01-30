import React, { useState , useEffect } from 'react';
import { Color } from '../enum.js'
import { compare } from '../util.js';

const SingleGuess = (props) => {
    //console.log(props.results);

    return(
        <div>
        {props.results.map(({char, color}) => (
            <span style={{ backgroundColor: `${color}`}}>{char}</span> 

        ))}
        </div>
    );

};

export default SingleGuess;

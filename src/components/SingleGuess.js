import React from 'react';
import "./style.css";

const SingleGuess = (props) => {
    //console.log(props);
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

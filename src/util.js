
import { useEffect, useState } from "react";
import { Color } from "./enum";

//const answer = "demon".toUpperCase()

export const compare = (guess, answer) => {
    if (!guess || !answer){
        return []
    }
    console.log(guess, answer)
    const results = []
   
    const count = {}
    for (let i = 0; i < answer.length; i++){
        var exist = false
        var correctPos = false
        for (let j = 0; j < answer.length; j++){
            //console.log(guess[i], answer[j], guess[i] === answer[j] )
            if (guess[i] === answer[j]){
                exist = true;
                if (i === j) correctPos = true;
               
            }
        }
        if (exist) count[guess[i]] = (count[guess[i]] ?? 0) + 1;
        if (exist && correctPos) results.push({char: guess[i], color: Color.CORRECT});
        else if (exist)results.push({char: guess[i], color: Color.WRONGPOS});
        else results.push({char: guess[i], color: Color.NOTEXIST});
        
    }
    console.log(count);
    for (const key in count) {
        if (count[key] > 1){
            console.log(count[key]);
            let num = 0
            for (const c in answer){
                if (answer[c] === key) num += 1;
            }
            console.log(num);
            let rightpos = false;
            if (num < count[key]){
                results.forEach(pair => {
                    if (pair.char === key && pair.color === Color.CORRECT) rightpos = true;
                })
                console.log(rightpos);
                if (rightpos){
                    num -= 1;
                    results.forEach(pair => {
                        if (num === 0 && pair.char === key && pair.color != Color.CORRECT) pair.color = Color.NOTEXIST;
                        else if (pair.char === key && pair.color != Color.CORRECT) num -= 1;
                    })   
                } else {
                    console.log(num);
                    results.forEach(pair => {
                        if (num === 0 && pair.char === key) {pair.color = Color.NOTEXIST;console.log(pair);}
                        else if (pair.char === key) {num -= 1;console.log(pair);}
                    })
                }   
            }

        }
    }

    


    console.log(results);
    return results;
}

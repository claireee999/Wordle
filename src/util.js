import { Color } from "./enum";

export const compare = (guess, answer) => {
    if (!guess || !answer){
        return []
    }
    const results = []
   
    const count = {}
    for (let i = 0; i < answer.length; i++){
        let exist = false;
        let correctPos = false;
        for (let j = 0; j < answer.length; j++){
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

    for (const key in count) {
        if (count[key] > 1){
            let num = 0
            for (const c in answer){
                if (answer[c] === key) num += 1;
            }
            let rightpos = 0;
            if (num < count[key]){
                results.forEach(pair => {
                    if (pair.char === key && pair.color === Color.CORRECT) rightpos += 1;
                })
                num -= rightpos;
                results.forEach(pair => {
                    if (num === 0 && pair.char === key && pair.color != Color.CORRECT) pair.color = Color.NOTEXIST;
                    else if (pair.char === key && pair.color != Color.CORRECT) num -= 1;
                })   
            }

        }
    }

    return results;
}

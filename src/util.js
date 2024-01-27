
import { Color } from "./enum"

const answer = "color"
export const compare = (guess) => {
    const results = []
    for (let i = 0; i < answer.length; i++){
        for (let j = 0; i < answer.length; j++){
            if (guess[i] == answer[j] && i == j){
                results.push({char: guess[i], color: Color.CORRECT})
            } else if (guess[i] == answer[j]){
                results.push({char: guess[i], color: Color.WRONGPOS})
            } else {
                results.push({char: guess[i], color: Color.NOTEXIST})
            }
        }
    }
    return results
}

import React from "react"
import { WINNER_COMBOS } from "../../constants"

const checkWinnerFrom=(newBoard)=>{
    //revisamos comb ganadoras para ver si x u o  
      for(const combo of WINNER_COMBOS){
        const [a,b,c]=combo //a b y c son 0 1 y 2
        if(
          newBoard[a]&& //aca mira si hay algo en esta  posicion
          newBoard[a]==newBoard[b] && //aca ya te dice si lo q hay en el array en la posicion a (0)es == a lo que hay en la b (1), y lo mismo con la c(2), que retorne lo q hay en la a (puede ser una x o una o )
          newBoard[a]==newBoard[c]  
        ){
          return newBoard[a]
        }
      }
      //si no hay ningun ganador xq lo q hay en las posiciones es diferente:
      return null
    }

export {checkWinnerFrom}
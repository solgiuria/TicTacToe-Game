import { useState } from 'react'
import './App.css'
import {Square} from './Components/Square/Square'
import { checkWinnerFrom } from './Components/WinnerLogic/WinnerLogic'
import { WinnerModal } from './Components/WinnerModal/WinnerModal'
import confetti from "canvas-confetti"
import { TURNS} from './constants'

function App() {
//si no hago local storage borro 12 13 (menos array...) 43 44 45
  const [board, setBoard] = useState(
    Array(9).fill(null)
  )

  const [turn, setTurn]= useState(TURNS.X)
  // null es que no hay ganador, false es que hay un empate
  const [winner, setWinner] = useState(null)


  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X) //arranca el q gano
    setWinner(null)
    console.log('me estoy ejecutando')
  }


  const updateBoard = (index) => { //actualizar el tablero
    // no actualizamos esta posición
    // si ya tiene algo
    if (board[index] || winner) return //esto dice que si intentamos clickear en una casilla ya llena o si tenemos un ganador, que no te permita seguir jugando
    // actualizar el tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    // cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    //revisar si hay ganador
    const newWinner=checkWinnerFrom(newBoard) 
    // 1. esto tiene el ultimo movimiento, es decir, checkea (checkWinner) siempre el ultimo movimiento (newBoard) para ver si hay un ganador (newWinner que se setea en setWinner)
    //2. por que le paso a checkWinner newBoard y no el estado board (siendo que en la linea 56 a board se le seteo newBoard)?... porq la act de estados en react puede/es asincronica, asi que no podemos asegurarnos de que este se haya actualizado o no, lo q porovocaria q el estado funcione en base a una actualizacion vieja o nula
    if(newWinner){
      setWinner(newWinner)
      confetti()
      console.log(winner)
    }else{
      if(!newBoard.includes(null)){
        setWinner(false) //empate
      }
    }
  }

  return (
    <main className='board'>
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>Reset del juego</button> 
      <section className='game'>
        {
          board.map((_,index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {board[index]} 
              </Square>
            )
          })
        }
      </section>
      
      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X} 
          {/* aca simplemente renderiza en el cuadradito del turno la x y la 0 , si lo saco aparece el cuadrado vacio*/}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner}/> 
    </main>
  )
}

export default App

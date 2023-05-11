import { Square } from "../Square/Square"
const WinnerModal=({winner, resetGame})=>{
const winnerText= winner ==false ? 'Han empatado!' : 'El ganador es:'
    return(
        winner !== null && (
            <section className='winner'>
                <div className='text'> 
                    <h2>
                      {winnerText}
                    </h2>
                    <header className='win'>
                      {winner && <Square>{winner}</Square>} 
                      {/* si hay un winner hace eso, circuito corto */}
                    </header>
                    <footer>
                      <button onClick={()=>resetGame()}>Empezar de nuevo</button>
                    </footer>     
                </div>
            </section>
        )
    )
}

export {WinnerModal}
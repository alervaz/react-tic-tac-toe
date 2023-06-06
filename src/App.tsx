import { Dispatch, SetStateAction, createContext, useEffect, useState } from 'react'
import Grid from './components/Grid'
import Header from './components/Header'
import shuffle from './utils/Shuffle'
import checkWin from './utils/CheckWin'

interface Context {
  player: number
  setPlayer: Dispatch<SetStateAction<number>>
  player1Cells: number[]
  setPlayer1Cells: Dispatch<SetStateAction<number[]>> 
  player2Cells: number[]
  setPlayer2Cells: Dispatch<SetStateAction<number[]>> 
  disabled: boolean
  setDisabled: Dispatch<SetStateAction<boolean>>
  winningCells: number[]
  setWinningCells: Dispatch<SetStateAction<number[]>>
  player1Wins: number
  setPlayer1Wins: Dispatch<SetStateAction<number>>
  player2Wins: number
  setPlayer2Wins: Dispatch<SetStateAction<number>>
}

export const GlobalContext = createContext<Context>({
  player: 0,
  setPlayer: () => {return},
  player1Cells: [],
  setPlayer1Cells: () => {return},
  player2Cells: [],
  setPlayer2Cells: () => {return},
  disabled: false,
  setDisabled: () => {return},
  winningCells: [],
  setWinningCells: () => {return},
  player1Wins: 0,
  setPlayer1Wins: () => {return},
  player2Wins: 0,
  setPlayer2Wins: () => {return},
});


function App() {
  const [player, setPlayer] = useState(shuffle);
  const [player1Cells, setPlayer1Cells] = useState<number[]>([]);
  const [player2Cells, setPlayer2Cells] = useState<number[]>([]);
  const [disabled, setDisabled] = useState(false);
  const [winningCells, setWinningCells] = useState<number[]>([]);
  const [player1Wins, setPlayer1Wins] = useState(0);
  const [player2Wins, setPlayer2Wins] = useState(0);
 
  const clearTable = () => {
    setPlayer(shuffle);
    setPlayer1Cells([]);
    setPlayer2Cells([]);
    setWinningCells([]);
    setDisabled(false);
  }


  
  useEffect(() => {
      const [checkPlayer1Win, winningCells1] = checkWin(player1Cells);
      console.log(player1Cells);
      
      const [checkPlayer2Win, winningCells2] = checkWin(player2Cells);
      let timeOut: number;

      if(checkPlayer1Win) {
        setDisabled(true);
        setPlayer1Wins((prevWins) => prevWins + 1);
        timeOut = setTimeout(() => {
          clearTable();
        }, 2000);
        setWinningCells(winningCells1);

      } else if(checkPlayer2Win) {
        setDisabled(true);
        setPlayer2Wins((prevWins) => prevWins + 1);
        timeOut = setTimeout(() => {
          clearTable();
        }, 2000);
        setWinningCells(winningCells2);
      } else if([...player1Cells,...player2Cells].length === 9) {
        timeOut = setTimeout(() => {
          clearTable();
        }, 2000);
      }
      

      return () => {
        clearTimeout(timeOut);
      }
  }, [player1Cells, player2Cells]);

  return (
    <GlobalContext.Provider value={{player, setPlayer, player1Cells, setPlayer1Cells, player2Cells, setPlayer2Cells, disabled, setDisabled, winningCells, setWinningCells, player1Wins, setPlayer1Wins, player2Wins, setPlayer2Wins}}>
        <main className={`${player === 1 ? "red" : "blue"}`}>
          <Header/>
          <Grid/>
        </main>
    </GlobalContext.Provider>
  )
}

export default App

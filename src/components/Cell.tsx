import { useEffect, useState } from 'react';
import './Cell.css';
import useGlobalContext from '../hooks/useGlobalContext';
import { ImCross } from 'react-icons/im';
import { FaCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';

function Cell({ id }: { id:number }) {
    const [value, setValue] = useState("");
    const { player, setPlayer, player2Cells, setPlayer1Cells, setPlayer2Cells, disabled, winningCells, player1Cells, player1Wins, player2Wins } = useGlobalContext();
    const [isFlipped, setIsFlipped] = useState(false);
    
    useEffect(() => {
        if(player1Cells.length === 0 && player2Cells.length === 0) {
            setIsFlipped(false);
            setValue("");
        }
    }, [player1Cells, player2Cells])

    useEffect(() => {
        document.title = `Red ${player1Wins} : Blue ${player2Wins}`
    }, [player1Wins, player2Wins])
    
    
    return(
        <motion.div
            whileHover={{scale: 1.1}}
            whileTap={{scale: 0.9}}
            transition={{ type: "spring", damping: 30, stiffness: 1000 }}
            className={`cell ${value !== "" && "has-value"} ${winningCells.includes(id) ? "winning" : ""} ${player1Cells.includes(id) ? "player-1": "player-2"}`}
            onClick={() => {
                if(!isFlipped && !disabled) {
                    if(player === 1) {
                        setValue("x");
                        setPlayer(2);
                        setPlayer1Cells((prevCells) => [...prevCells, id]);
                    } else {
                        setValue("o");
                        setPlayer(1);
                        setPlayer2Cells((prevCells) => [...prevCells, id]);
                    }
                    setIsFlipped(true);
                }
            }}
        >
            {value === ""
                ? <img
                    src={`${"/react.svg"}`} 
                    alt="logo" 
                 />
                : (
                    value === "x"
                        ? <ImCross className="icon r"/>
                        : <div className="circle">
                            <FaCircle className="icon b"/>
                            <FaCircle className="o"/>
                            
                        </div>
                )
            }
        </motion.div>
    )
}

export default Cell;
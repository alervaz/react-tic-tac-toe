import useGlobalContext from '../hooks/useGlobalContext';
import './Header.css';

function Header() {
    const { player1Wins, player2Wins } = useGlobalContext();
    return(
        <header>
            <h1>Vite react toe</h1>
            <section className="wins">
                <p className='red-points'>Red {player1Wins}</p> <p className='punctuation'>:</p> <p className='blue-points'>Blue {player2Wins}</p>
            </section>
        </header>
    )
}

export default Header;
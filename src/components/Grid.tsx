import Cell from './Cell';
import './Grid.css';

function Grid() {
    
    return(
        <div className="grid">
            {new Array(9).fill(true).map((_, i) => 
                <Cell key={i} id={i + 1}/>
            )}
        </div>
    )
}

export default Grid;
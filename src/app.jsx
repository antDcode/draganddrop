import {useState} from 'preact/hooks'
import './app.css'

export function App() {
    const [boards, setBoards] = useState([[ 7, 3, 5],[8, 2, 4],[6,9,1]]);
    const [dragItem, setDragItem] = useState(null);
    const [dragRow, setDragRow] = useState(null);
    function handleStart(event,dragRow,dragItem) {
        event.dataTransfer.effectAllowed="move"
        setDragItem(dragItem)
        setDragRow(dragRow)
    }
    function handleOver(event) {
        event.preventDefault();
        event.dataTransfer.dropEffect="move"
    }
    function handleDrop(event,indexRow,indexItem) {
        event.preventDefault();
        let newBoard= boards.map((row)=>[...row]);
        if(indexRow===dragRow){
            let [dragEl]=newBoard[indexRow].splice(dragItem,1);
            newBoard[indexRow].splice(indexItem,0,dragEl);
        }
        else{
            let [dragEl]=newBoard[dragRow].splice(dragItem,1);
            let [dropEl]=newBoard[indexRow].splice(indexItem,1);
            newBoard[indexRow].splice(indexItem,0,dragEl);
            newBoard[dragRow].splice(dragItem,0,dropEl);
        }
        setBoards(newBoard)
    }
    return (
        <div className="container">
            {
                boards.map((row,indexRow)=>(
                    <div className="board">
                        <h3>{indexRow+1}</h3>
                        {row.map((item,indexItem)=>(
                            <div className="item"
                                 draggable={true}
                                 onDragStart={(event)=>{handleStart(event,indexRow,indexItem)}}
                                 onDragOver={(event)=>handleOver(event)}
                                 onDrop={event => handleDrop(event,indexRow,indexItem)}
                            ><p>{item}</p></div>
                        ))}
                    </div>
                ))
            }
        </div>
    )
}

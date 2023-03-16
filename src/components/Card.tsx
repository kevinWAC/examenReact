import { useState } from "react"
import { updateCard } from "../services/cards"

type CardProps = {
    id: number,
    question: string,
    answer: string,
    columnId: number,
    categoryId: number
    handleDeleteCard: (id: number) => {},
    handleReload: () => void,
    handleMoveLeft:  (id: number, columnId: number) => void,
    handleMoveRight: (id: number, columnId: number ) => void,
}
const Card = ({id, question, answer, columnId, categoryId, handleDeleteCard, handleReload, handleMoveRight, handleMoveLeft}: CardProps) => {
    const [display, setDisplay] = useState<boolean>(true);
    const [update, setIsUpdate] = useState<boolean>(false);
    const [updQuestion, setUpdQuestion] = useState<string>(question);
    const [updAnswer, setUpdAnswer] = useState<string>(answer);

    const updateThisCard = () => {
        const newCard = {
            id: id,
            question: updQuestion,
            answer: updAnswer,
            column: columnId,
            category: categoryId
        }
        updateCard(newCard)
        handleReload();
        setIsUpdate(false)
        setDisplay(true)
    }

return(
        <div className="card mt-4 p-4">
            {update &&
            <>
                <div>
                    <input style={{width:"100%"}} className="mb-1" type="text" value={updQuestion} onChange={(e)=>{setUpdQuestion(e.target.value)}}/>
                </div>
                <div>
                    <input  style={{width:"100%"}} className="mb-1" type="text" value={updAnswer} onChange={(e) => { setUpdAnswer(e.target.value)}} />
                </div>
                <button className="btn btn-primary" onClick={updateThisCard}>MODIFIER</button>
            </>
            }
            {!update && 
              <>
                <div style={{ cursor: "pointer" }} onClick={() => setDisplay(!display)}>{question}</div><div hidden={display}>
                    <p className="text-uppercase fw-bold">{answer}</p>
                </div>
            </>
            }
          
            <div style={{ cursor: "pointer" }} className="d-flex align-items-center justify-content-center align-self-center mt-3">
            <i style={{ cursor: "pointer" }} className="fa-solid fa-arrow-left pe-4" onClick={()=>handleMoveLeft(id, columnId)}></i>
            <button onClick={()=>handleDeleteCard(id)} className="fa-solid fa-trash btn btn-primary m-2"/>
            <button onClick={()=>setIsUpdate(!update)} className="fa-solid fa-pen btn btn-primary m-2"/>
            <i style={{ cursor: "pointer" }} className="fa-solid fa-arrow-right ps-4" onClick={()=>handleMoveRight(id, columnId)}></i>
            </div>
           
        </div>
)
}

export default Card;
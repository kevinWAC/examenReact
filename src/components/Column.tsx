import { useState } from "react";
import { addCard, deleteCard } from "../services/cards";
import { useCategoryContext } from "../context/category";
import Modal from "./Modal";
import Card from "./Card";

type ColumnProps = {
  id: number,
  title: string,
  cards: Card[],
  handleReload: () => void,
  handleMoveLeft:  (id: number, columnId: number) => void,
  handleMoveRight: (id: number, columnId: number ) => void,
}
const Column = ({id, title, cards, handleReload, handleMoveRight, handleMoveLeft}: ColumnProps) => {
const {category} = useCategoryContext();
const [showModal, setShowModal] = useState<boolean>(false);
const [question, setQuestion] = useState<string>("");
const [answer, setAnswer] = useState<string>("")

   const handleAddQuestion = async() => {
    if(question !== "" && answer !== ""){
        const newCard = {
            question: question,
            answer: answer,
            column: id,
            category: category!.id
        }
        setShowModal(false)
        setAnswer("")
        setQuestion("")
        const response = await addCard(newCard);
        if(response === 201) {
          handleReload()
        }
    }
   }

   const handleDeleteCard = async(id: number) => {
       if(window.confirm("Êtes-vous sûr de supprimer cette question ?")){
            await deleteCard(id)
            handleReload()
        }
   }

   const handleUpdateCard = () => {
    handleReload()
   }

    return(
        <div className=" row text-center w-25 shadow-sm p-3 mb-5 bg-white rounded" style={{height:"100%"}}>
        <div className="text-uppercase fw-bold">{title}</div>
        {cards.map((card) => {
            if (card.column === id ){
                return <Card key={card.id} columnId={id} categoryId={category!.id} {...card} handleDeleteCard={handleDeleteCard} handleReload={handleReload} handleMoveRight={handleMoveRight} handleMoveLeft={handleMoveLeft}/>
            } else {
                return null;
            }
        })}
         <button type="button" className="btn btn-primary mt-5" onClick={() => setShowModal(true)}>
        +
      </button>
      {showModal && (
        <div className="modal fade show" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-modal="true" style={{ display: "block" }}>
          <div className="modal-dialog">
            <Modal onClose={() => setShowModal(false)} setQuestion={setQuestion} setAnswer={setAnswer} handleAddQuestion={handleAddQuestion} />
          </div>
        </div>
      )}
        </div>
    )
}

export default Column;
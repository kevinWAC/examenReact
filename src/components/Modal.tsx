type ModalProps = {
    onClose: () => void
    setQuestion: (question: string) => void
    setAnswer: (answer: string) => void
    handleAddQuestion: () => void
}   



const Modal = ({onClose, setQuestion, setAnswer, handleAddQuestion}: ModalProps) => {
    return(
  <div className="modal-dialog">
  <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Nouvelle question</h5>
        <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
      </div>
      <div className="modal-body">
        <form>
          <div className="mb-3">
            <label htmlFor="question" className="col-form-label">Question</label>
            <input type="text" className="form-control" id="question" onChange={(e) => setQuestion(e.target.value)}/>
          </div>
          <div className="mb-3">
            <label htmlFor="answer" className="col-form-label">Réponse</label>
            <input className="form-control" id="answer" onChange={(e) => setAnswer(e.target.value)}/>
          </div>
        </form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" onClick={onClose}>Fermer</button>
        <button type="button" className="btn btn-primary" onClick={handleAddQuestion}>Enregistrer</button>
      </div>
    </div>
  </div>
)
}





export default Modal;
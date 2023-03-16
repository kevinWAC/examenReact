type ModalCategoryProps = {
    onClose: () => void
    setCategory: (category: string) => void
    handleAddCategory: () => void
}   

const ModalCategory = ({onClose, setCategory, handleAddCategory}: ModalCategoryProps) => {
    return (
        <div className="modal-dialog">
  <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Nouvelle catégorie</h5>
        <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
      </div>
      <div className="modal-body">
        <form>
          <div className="mb-3">
            <label htmlFor="question" className="col-form-label">Catégorie</label>
            <input type="text" className="form-control" id="question" onChange={(e) => setCategory(e.target.value)}/>
          </div>
        </form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" onClick={onClose}>Fermer</button>
        <button type="button" className="btn btn-primary" onClick={handleAddCategory}>Enregistrer</button>
      </div>
    </div>
  </div>
    )
}

export default ModalCategory;
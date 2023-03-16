import React, { useEffect, useState } from 'react';
import Category from './Category';
import { addCategory, deleteCategory, getCategories } from '../services/categories';
import Table from './Table';
import FormLogin from './FormLogin';
import ModalCategory from './ModalCategory';
import { deleteCard, getCardsByCategory } from '../services/cards';
import { useCategoryContext } from '../context/category';

function App() {
const {category: categorySelected, handleCategoryChange} = useCategoryContext();
const [categories, setCategories] = useState<Category[]>([]);
const [isLogged, setIsLogged] = useState<boolean>(false);
const [isError, setIsError] = useState<boolean>(false);
const [showModal, setShowModal] = useState<boolean>(false);
const [category, setCategory] = useState<string>("");
const [reload, setReload] = useState<boolean>(false);

useEffect(()=> {
  (async() => {
    try {
      const fetched_categories = await getCategories();
      setCategories(fetched_categories)
    } catch (error) {
      return console.log("error");
    }
  })();
  setReload(false)
},[reload, setReload])

const onSubmitLogin = (e: any) => {
  e.preventDefault();
  if(e.target.login.value === "admin" && e.target.pwd.value === "pwd") {
    setIsLogged(true)
    setIsError(false)
  } else {
    setIsError(true)
  }
}

const handleAddCategory = async() => {
  if(category !== "") {
    const newCategory = {
      name: category
    }
    setShowModal(false)
    setCategory("")
    const response = await addCategory(newCategory)
    if(response === 201) {
      setReload(true)
    }
  }
}

const handleDeleteCategory = async (id: number) => {
  if(window.confirm("Êtes-vous sûr de supprimer cette catégorie et les questions qui y sont liées ?")){
    const cardsByOneCategory: Card[] = await getCardsByCategory(id)    
    if(cardsByOneCategory.length > 0) {
      cardsByOneCategory.map((card: Card) => deleteCard(card.id))
    }
    deleteCategory(id)
    setReload(true)
    handleCategoryChange(null)
  }
}

  return (
    <div className="App container">
      <div className="text-center fs-1 mb-3" style={{color:'white', background: 'linear-gradient(to bottom right, blue, #2C396F)'}}>MEMO</div>
      {isError && <p style={{color:"red"}}>Mauvais login ou mot de passe !</p>}
      {isLogged && <div>
        <header className="d-flex align-items-center p-2">
        <button className="btn btn-primary" onClick={()=>setShowModal(true)}>+</button>
        {showModal && (
        <div className="modal fade show" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-modal="true" style={{ display: "block" }}>
          <div className="modal-dialog">
            <ModalCategory onClose={() => setShowModal(false)} setCategory={setCategory} handleAddCategory={handleAddCategory} />
          </div>
        </div>
      )}
          {(categories && categories.length > 0 ) && categories.map((category)=> <Category key={category.id} {...category} handleDeleteCategory={handleDeleteCategory}/>)}
        </header>
        {categorySelected && <Table/>}
      </div>
      }
      {!isLogged && <div className='text-center'><FormLogin onSubmitLogin={onSubmitLogin}/></div>}
    </div>
  );
}

export default App;

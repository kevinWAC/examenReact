import { useCategoryContext } from "../context/category"

type CategoryProps = {
    id: number,
    name: string,
    handleDeleteCategory: (id: number) => void
}

const Category = ({id, name, handleDeleteCategory}: CategoryProps) => {
    const {handleCategoryChange} = useCategoryContext();
    return(
        <div className="d-flex p-2 btn-group">
            <button className="btn btn-secondary" onClick={(e)=> handleCategoryChange({id, name})}>{name}</button>
            <button className="btn btn-danger" onClick={() => handleDeleteCategory(id)}>x</button>
        </div> 
    )
}

export default Category;
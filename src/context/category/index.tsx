import { createContext, ReactNode, useContext } from "react";
import useCategory from "../../hooks/categories/useCategory";

const CategoryContext = createContext<{
    category: Category | null;
    handleCategoryChange: (category: Category | null) => void;
}>({
    category: null,
    handleCategoryChange: () => {}
})

type CategoryContextProviderProps = {
    children: ReactNode;
}

const CategoryContextProvider = ({children}: CategoryContextProviderProps) => {
    const {category, handleCategoryChange} = useCategory();
    return (
        <CategoryContext.Provider value={{ category, handleCategoryChange }}>
            {children}
        </CategoryContext.Provider>
    )
}

const useCategoryContext = () => {
    const {category, handleCategoryChange} = useContext(CategoryContext);
    return {category, handleCategoryChange};
}

export {
    CategoryContext,
    CategoryContextProvider,
    useCategoryContext
}
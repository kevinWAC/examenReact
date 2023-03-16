import { useCallback, useState } from "react"
const useCategory = () => {
    const [category, setCategory] = useState<Category | null>(null)

const handleCategoryChange = useCallback((category: Category | null) => {
    setCategory(category)
},[])    

return {category, handleCategoryChange};
};

export default useCategory;
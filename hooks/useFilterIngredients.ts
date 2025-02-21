import { Api } from "@/services/api-client"
import { Ingredient } from "@prisma/client"
import React from "react"
import { useSet } from "react-use";


interface ReturnProps {
    ingredients: Ingredient[];
    loading: boolean;
    selectedIngredients: Set<string>;
    onAddId: (id: string) => void
    // onAddId: (key: never) => void
}

export const useFilterIngredients = (values: string[] = []): ReturnProps => {
    const [ingredients, setIngredients] = React.useState<Ingredient[]>([])
    const [loading, setLoading] = React.useState(true)

    const [selectedIds, {toggle}] = useSet(new Set([])) //хук для использования встроенной реализации множеств (set)
    // с помощью useSet храним список выбранных id ингредиентов
    React.useEffect(() => {
        async function fetchIngredients() {
            try {
                setLoading(true)
                const ingredients = await Api.ingredients.getAll()
                setIngredients(ingredients)
            } catch (error) {
                console.log(error)
            } finally { //Когда промис был выполнен, вне зависимости успешно или с ошибкой, указанная функция будет выполнена
                setLoading(false)
            }
        }
        fetchIngredients()
    },[])


    // const setSelectedIngredients = (ids: string[]) => {
    //     ids.forEach(selectedIds.add)
    // }

    return {ingredients, loading, onAddId: toggle, selectedIngredients: selectedIds}
} 
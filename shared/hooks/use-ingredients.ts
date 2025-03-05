import { Api } from "@/shared/services/api-client"
import { Ingredient } from "@prisma/client"
import React from "react"

export const useIngredients = () => {
    const [ingredients, setIngredients] = React.useState<Ingredient[]>([])
    const [loading, setLoading] = React.useState(true)
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
    }, [])

    return {ingredients, loading}
}
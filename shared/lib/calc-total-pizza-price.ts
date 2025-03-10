//? Для choose-pizza-form

import { Ingredient, ProductItem } from "@prisma/client"
import { PizzaSize, PizzaType } from "../constants/pizza"


/**
 * Функция для подсчета общей стоимости пиццы
 * 
 * @example ```calcTotalPizzaPrice(1,20,items,ingredients,selectedIngredients)```
 * 
 * @param type - тип теста выбранной пиццы
 * @param size - размер выбранной пиццы
 * @param items - список вариаций
 * @param ingredients - список ингредиентов
 * @param selectedIngredients - выбранные ингредиенты 
 * 
 * @returns общую стоимость (Number)
 */
export const calcTotalPizzaPrice = (
    type: PizzaType, 
    size: PizzaSize, 
    items: ProductItem[], 
    ingredients: Ingredient[],
    selectedIngredients: Set<number>, 
) => {
    // TODO: можно сделать чтобы при выборе несуществующего типа пиццы сбрасывалось на первый вариант. Сейчас в таком случае просто ставится цена 0 р и эта проблема решается через useEffect, но можно допилить код так, чтобы на секунду не всплывало 0 р
    const pizzaPrice = items.find((item) => item.pizzaType === type && item.size === size)?.price || 0
    const totalIngredientsPrice = ingredients.filter((ingredient) => selectedIngredients.has(ingredient.id)).reduce(
        (acc, ingredient) => acc + ingredient.price, 0
    ) // сумма цен выбранных ингредиентов
    return pizzaPrice + totalIngredientsPrice

}
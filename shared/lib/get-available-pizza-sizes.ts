import { ProductItem } from "@prisma/client"
import { pizzaSizes, PizzaType } from "../constants/pizza"
import { Variant } from "../components/shared/group-variants"

export const getAvailablePizzaSizes = (type: PizzaType, items: ProductItem[]): Variant[] => {
    const filteredPizzasByType = items.filter((item) => item.pizzaType === type)
    return pizzaSizes.map((item) => ({
        name: item.name,
        value: item.value,
        disabled: !filteredPizzasByType.some((pizza) => Number(pizza.size) === Number(item.value))
        // отключает кнопку размера если нет такого размера у выбранного типа теста
        // т.е. сравнивается размер пиццы в бд с названием кнопки. 9:50 
    }))
}
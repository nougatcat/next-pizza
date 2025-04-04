import { useSearchParams } from "next/navigation"
import { useSet } from "react-use";
import React from "react";

interface PriceProps {
    priceFrom?: number;
    priceTo?: number;
}
interface QueryFilters extends PriceProps {
    pizzaTypes: string;
    sizes: string;
    ingredients: string;
}
export interface Filters {
    sizes: Set<string>
    pizzaTypes: Set<string>
    prices: PriceProps
    selectedIngredients: Set<string>
}
interface ReturnProps extends Filters {
    setPrices: (name: keyof PriceProps, value: number) => void
    setPizzaTypes: (value: string) => void
    setSizes: (value: string) => void
    setSelectedIngredients: (value: string) => void
}


export const useFilters = (): ReturnProps => {
    const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string> //получаем урл параметры

    // Фильтр ингредиентов
    const [selectedIngredients, { toggle: toggleIngredients }] = useSet(new Set<string>(
        searchParams.get('ingredients')?.split(',')
    )) //useSet для использования встроенной реализации множеств (set)

    // Фильтр размеров
    const [sizes, { toggle: toggleSizes }] = useSet(
        new Set<string>(searchParams.has('sizes') ? searchParams.get('sizes')?.split(',') : [])
    )

    // Фильтр типа пицц
    const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(
        new Set<string>(searchParams.has('pizzaTypes') ? searchParams.get('pizzaTypes')?.split(',') : [])
    )

    // Фильтр цены
    const [prices, setPrices] = React.useState<PriceProps>({
        priceFrom: Number(searchParams.get('priceFrom')) || undefined,  //для сохранения урл после перезагрузки
        priceTo: Number(searchParams.get('priceTo')) || undefined
    })

    const updatePrice = (name: keyof PriceProps, value: number) => {
        setPrices(prev => ({
            ...prev,
            [name]: value,
        }))
    }

    return React.useMemo(
        () => ({
            sizes,
            pizzaTypes,
            selectedIngredients,
            prices,

            setSizes: toggleSizes,
            setPizzaTypes: togglePizzaTypes,
            setSelectedIngredients: toggleIngredients,
            setPrices: updatePrice,
        }),
        [sizes, pizzaTypes, selectedIngredients, prices]
    )
//! без useMemo модальное окно продукта не закрывается! - потому что иначе каждый раз возвращается новый объект при закрытии
}
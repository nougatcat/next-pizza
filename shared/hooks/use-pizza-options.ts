import { useSet } from 'react-use';
import { Variant } from '../components/shared/group-variants';
import { PizzaSize, PizzaType } from '../constants/pizza';
import React from "react"
import { getAvailablePizzaSizes } from '../lib';
import { ProductItem } from '@prisma/client';

interface ReturnProps {
    size: PizzaSize,
    type: PizzaType,
    selectedIngredients: Set<number>,
    availableSizes: Variant[],
    setSize: (size: PizzaSize) => void,
    setType: (type: PizzaType) => void,
    addIngredient: (id: number) => void
}

export const usePizzaOptions = (
    items: ProductItem[],
): ReturnProps => {
    const [size, setSize] = React.useState<PizzaSize>(20)
    const [type, setType] = React.useState<PizzaType>(1)
    const [selectedIngredients, { toggle: addIngredient }] = useSet(new Set<number>([]))

    const availableSizes = getAvailablePizzaSizes(type, items)

    React.useEffect(() => {
        const isAvailableSize = availableSizes?.find((item) => Number(item.value) === size && !item.disabled) // существует ли пицца выбранного размера

        const availableSize = availableSizes?.find((item) => !item.disabled)
        if (!isAvailableSize && availableSize) { //если нет доступного размера и есть другой доступный, то переместить на первый доступный
            setSize(Number(availableSize.value) as PizzaSize)
        }
    }, [type]) //следи за изменением типа теста, чтобы в случае недоступности размера пиццы переместить кнопку на первый доступный размер

    return {
        size,
        type,
        selectedIngredients,
        availableSizes,
        setSize,
        setType,
        addIngredient
    }
}
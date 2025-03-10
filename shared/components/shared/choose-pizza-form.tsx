// 'use client'; 
import React from 'react';
import { useSet } from 'react-use';
import { Ingredient, ProductItem } from '@prisma/client';
import { cn } from '@/shared/lib/utils';

import { PizzaImage } from './pizza-image';
import { Title } from './title';
import { Button } from '../ui';
import { GroupVariants } from './group-variants';
import { mapPizzaType, PizzaSize, pizzaSizes, PizzaType, pizzaTypes } from '@/shared/constants/pizza'
import { IngredientItem } from './ingredient-item';


interface Props {
    imageUrl: string;
    name: string;
    ingredients: Ingredient[];
    //items: ProductWithRelations['items']; //в качестве типа берем часть items из этого типа т.е. ProductItem[]. Вроде можно просто написать тип ProductItem[]
    items: ProductItem[]
    onClickAddCart?: VoidFunction;
    className?: string;
}

export const ChoosePizzaForm: React.FC<Props> = ({
    name,
    items,
    imageUrl,
    ingredients,
    onClickAddCart,
    className
}) => {
    const [size, setSize] = React.useState<PizzaSize>(20)
    const [type, setType] = React.useState<PizzaType>(1)

    const [selectedIngredients,{toggle: addIngredient}] = useSet(new Set<number>([]))

    // TODO: можно сделать чтобы при выборе несуществующего типа пиццы сбрасывалось на первый вариант. Сейчас в таком случае просто ставится цена 0 р и эта проблема решается через useEffect, но можно допилить код так, чтобы на секунду не всплывало 0 р
    const pizzaPrice = items.find((item) => item.pizzaType === type && item.size === size)?.price || 0
    const totalIngredientsPrice = ingredients.filter((ingredient) => selectedIngredients.has(ingredient.id)).reduce(
        (acc, ingredient) => acc + ingredient.price, 0
    ) // сумма цен выбранных ингредиентов
    const totalPrice = pizzaPrice + totalIngredientsPrice

    const textDetails = `${size} см. ${mapPizzaType[type]} пицца`

    // TODO: сделать реальный хендлер при клике "добавить в корзину"
    const handleClickAdd = () => {
        onClickAddCart?.()
        console.log({
            size,
            type,
            ingredients: selectedIngredients
        })
    }

    const availablePizzas = items.filter((item) => item.pizzaType === type)
    const availablePizzaSizes = pizzaSizes.map((item) => ({
        name: item.name,
        value: item.value,
        disabled: !availablePizzas.some((pizza) => Number(pizza.size) === Number(item.value))
        // отключает кнопку размера если нет такого размера у выбранного типа теста
        // т.е. сравнивается размер пиццы в бд с названием кнопки. 9:50 
    }))

    React.useEffect(() => {
        const isAvailableSize = availablePizzaSizes?.find((item) => Number(item.value) === size && !item.disabled) // существует ли пицца выбранного размера
        
        const availableSize = availablePizzaSizes?.find((item) => !item.disabled)
        if (!isAvailableSize && availableSize) { //если нет доступного размера и есть другой доступный, то переместить на первый доступный
            setSize(Number(availableSize.value) as PizzaSize)
        }
    }, [type]) //следи за изменением типа теста, чтобы в случае недоступности размера пиццы переместить кнопку на первый доступный размер

    return (
        <div className={cn(className, 'flex flex-1')}>
            <PizzaImage imageUrl={imageUrl} size={size} />

            <div className='w-[490px] bg-[#F7F6F5] p-7'>
                <Title text={name} size='md' className='font-extrabold mb-1' />
                <p className='text-gray-400'>{textDetails}</p>

                <div className='flex flex-col gap-4 mt-5'>
                    <GroupVariants items={availablePizzaSizes} selectedValue={String(size)}
                        onClick={value => setSize(Number(value) as PizzaSize)} />
                    <GroupVariants items={pizzaTypes} selectedValue={String(type)}
                        onClick={value => setType(Number(value) as PizzaType)} />
                </div>

                <div className='bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5'>
                    <div className='grid grid-cols-3 gap-3'>
                        {
                            ingredients.map((ingredient) => (
                                <IngredientItem
                                    key={ingredient.id}
                                    name={ingredient.name}
                                    imageUrl={ingredient.imageUrl}
                                    price={ingredient.price}
                                    onClick={() => addIngredient(ingredient.id)}
                                    active={selectedIngredients.has(ingredient.id)}
                                />
                            ))
                        }
                    </div>
                </div>

                <Button
                    className='h-[55px] px-10 text-base rounded-[18px] w-full mt-10'
                    onClick={handleClickAdd}
                > Добавить в корзину за {totalPrice} ₽
                </Button>
            </div>
        </div>
    );
};
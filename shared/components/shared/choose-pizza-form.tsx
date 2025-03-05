// 'use client'; 

import { cn } from '@/shared/lib/utils';
import React from 'react';
import { PizzaImage } from './pizza-image';
import { Title } from './title';
import { Button } from '../ui';
import { GroupVariants } from './group-variants';
import { PizzaSize, pizzaSizes, PizzaType, pizzaTypes } from '@/shared/constants/pizza';
import { Ingredient } from '@prisma/client';
import { IngredientItem } from './ingredient-item';
import { useSet } from 'react-use';

interface Props {
    imageUrl: string;
    name: string;
    ingredients: Ingredient[];
    items?: any[];
    onClickAdd?: VoidFunction;
    className?: string;
}

export const ChoosePizzaForm: React.FC<Props> = ({
    name,
    items,
    imageUrl,
    ingredients,
    onClickAdd,
    className
}) => {
    const [size, setSize] = React.useState<PizzaSize>(20)
    const [type, setType] = React.useState<PizzaType>(1)

    const [selectedIngredients,{toggle: addIngredient}] = useSet(new Set<number>([]))


    const textDetails = 'шаблон 30 см, традиционное тесто 30'
    const totalPrice = 228

    return (
        <div className={cn(className, 'flex flex-1')}>
            <PizzaImage imageUrl={imageUrl} size={size} />

            <div className='w-[490px] bg-[#F7F6F5] p-7'>
                <Title text={name} size='md' className='font-extrabold mb-1' />
                <p className='text-gray-400'>{textDetails}</p>

                <div className='flex flex-col gap-4 mt-5'>
                    <GroupVariants items={pizzaSizes} selectedValue={String(size)}
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
                > Добавить в корзину за {totalPrice} ₽
                </Button>
            </div>
        </div>
    );
};
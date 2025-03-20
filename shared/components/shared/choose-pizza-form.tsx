'use client';
import React from 'react';
import { Ingredient, ProductItem } from '@prisma/client';
import { cn } from '@/shared/lib/utils';

import { PizzaImage } from './pizza-image';
import { Title } from './title';
import { Button } from '../ui';
import { GroupVariants } from './group-variants';
import { PizzaSize, PizzaType, pizzaTypes } from '@/shared/constants/pizza'
import { IngredientItem } from './ingredient-item';
import { getPizzaDetails } from '@/shared/lib';
import { usePizzaOptions } from '@/shared/hooks/use-pizza-options';

interface Props {
    imageUrl: string;
    name: string;
    ingredients: Ingredient[];
    //items: ProductWithRelations['items']; //в качестве типа берем часть items из этого типа т.е. ProductItem[]. Вроде можно просто написать тип ProductItem[]
    loading?: boolean
    items: ProductItem[]
    onSubmit: (itemId: number, ingredients: number[]) => void
    className?: string;
}

export const ChoosePizzaForm: React.FC<Props> = ({
    name,
    items,
    imageUrl,
    ingredients,
    loading,
    onSubmit,
    className
}) => {
    const {
        size,
        type,
        selectedIngredients,
        availableSizes,
        currentItemId,
        setSize,
        setType,
        addIngredient
    }
        = usePizzaOptions(items)

    const { totalPrice, textDetails }
        = getPizzaDetails(type, size, items, ingredients, selectedIngredients)

    // хендлер при клике "добавить в корзину". Обрати внимание, что это коллбек
    const handleClickAdd = () => {
        if (currentItemId) {
            onSubmit(currentItemId, Array.from(selectedIngredients))
        }
    }

    return (
        <div className={cn(className, 'flex flex-1')}>
            <PizzaImage imageUrl={imageUrl} size={size} />

            <div className='w-[490px] bg-[#F7F6F5] p-7'>
                <Title text={name} size='md' className='font-extrabold mb-1' />
                <p className='text-gray-400'>{textDetails}</p>

                <div className='flex flex-col gap-4 mt-5'>
                    <GroupVariants items={availableSizes} selectedValue={String(size)}
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
                    loading={loading}
                    className='h-[55px] px-10 text-base rounded-[18px] w-full mt-10'
                    onClick={handleClickAdd}
                > Добавить в корзину за {totalPrice} ₽
                </Button>
            </div>
        </div>
    );
};
// 'use client'; 

import { cn } from '@/shared/lib/utils';
import React from 'react';
import { PizzaImage } from './pizza-image';
import { Title } from './title';
import { Button } from '../ui';
import { GroupVariants } from './group-variants';
import { PizzaSize, pizzaSizes, PizzaType } from '@/shared/constants/pizza';

interface Props {
    imageUrl: string;
    name: string;
    ingredients: any[];
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


    const textDetails = 'шаблон 30 см, традиционное тесто 30'
    const totalPrice = 228

    return (
        <div className={cn(className, 'flex flex-1')}>
            <PizzaImage imageUrl={imageUrl} size={size}/>

            <div className='w-[490px] bg-[#F7F6F5] p-7'>
                <Title text={name} size='md' className='font-extrabold mb-1' />
                <p className='text-gray-400'>{textDetails}</p>

                <GroupVariants items={pizzaSizes} selectedValue={String(size)} 
                    onClick={value => setSize(Number(value) as PizzaSize)} />

                <Button
                    className='h-[55px] px-10 text-base rounded-[18px] w-full mt-10'
                > Добавить в корзину за {totalPrice} ₽
                </Button>
            </div>
        </div>
    );
};
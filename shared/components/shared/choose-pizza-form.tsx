import { cn } from '@/shared/lib/utils';
import React from 'react';
import { PizzaImage } from './pizza-image';
import { Title } from './title';
import { Button } from '../ui';

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
    const textDetails = 'шаблон 30 см, традиционное тесто 30'
    const totalPrice = 228

    return (
        <div className={cn(className, 'flex flex-1')}>
            <PizzaImage imageUrl={imageUrl} size={30}/>

            <div className='w-[490px] bg-[#F7F6F5] p-7'>
                <Title text={name} size='md' className='font-extrabold mb-1' />
                <p className='text-gray-400'>{textDetails}</p>
                <Button
                    className='h-[55px] px-10 text-base rounded-[18px] w-full mt-10'
                > Добавить в корзину за {totalPrice} ₽
                </Button>
            </div>
        </div>
    );
};
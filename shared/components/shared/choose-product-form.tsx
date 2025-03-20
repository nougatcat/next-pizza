import { cn } from '@/shared/lib/utils';
import React from 'react';
import { Title } from './title';
import { Button } from '../ui';

interface Props {
    imageUrl: string;
    name: string;
    price: number;
    onSubmit?: VoidFunction;
    className?: string;
}

export const ChooseProductForm: React.FC<Props> = ({
    name,
    imageUrl,
    price,
    onSubmit,
    className
}) => {
    // const textDetails = 'шаблон 30 см, традиционное тесто 30'
    // const totalPrice = 228

    return (
        <div className={cn(className, 'flex flex-1')}>
            <div className='flex items-center justify-center flex-1 relative'>
                <img
                    src={imageUrl}
                    alt={name}
                    className='relative left-2 top-2 transition-all z-10 duration-300 w-[350px] h-[350px]'
                />
            </div>
            {/* нет круглых черточек вокруг картинки, в отличие от PizzaImage */}

            <div className='w-[490px] bg-[#F7F6F5] p-7'>
                <Title text={name} size='md' className='font-extrabold mb-1' />
                {/* <p className='text-gray-400'>{textDetails}</p> */}
                <Button
                    onClick={onSubmit}
                    className='h-[55px] px-10 text-base rounded-[18px] w-full mt-10'
                > Добавить в корзину за {price} ₽
                </Button>
            </div>
        </div>
    );
};
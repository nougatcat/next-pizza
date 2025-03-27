'use client'
import React from 'react'
import { cn } from '@/shared/lib/utils';
import { X } from 'lucide-react'
import { CartItemProps } from './cart-item-details/cart-item-details.types';
import * as CartItemDetails from './cart-item-details'

interface Props extends CartItemProps {
    onClickCountButton?: (type: 'plus' | 'minus') => void;
    onClickRemove?: () => void
    className?: string;
}

export const CheckoutItem: React.FC<Props> = ({
    name,
    price,
    imageUrl,
    quantity,
    details,
    disabled,
    className,
    onClickCountButton,
    onClickRemove
}) => {
    return (
        <div className={cn('flex items-center justify-between', {
            'opacity-50 pointer-event-none': disabled
        }, className)}>
            <div className='flex items-center gap-5 flex-1'>
                <CartItemDetails.Image src={imageUrl} />
                <CartItemDetails.Info name={name} details={details} />
            </div>

            <CartItemDetails.Price value={price} />

            <div className='flex items-center gap-5 ml-20'>
                <CartItemDetails.CountButton onClick={onClickCountButton} value={quantity} />
                <button type='button' onClick={onClickRemove}>
                    {/* //! если не прописать type='button', то кнопка будет постоянно дергать форму */}
                    <X className='text-gray-400 cursor-pointer hover:text-gray-600' size={20}></X>
                </button>
            </div>
        </div>
    );
};
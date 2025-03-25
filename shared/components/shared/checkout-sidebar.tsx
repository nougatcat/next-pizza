import React from 'react';
import { WhiteBlock } from './white-block';
import { CheckoutItemDetails } from './checkout-item-details';
import { ArrowRight, Package, Percent, Truck } from 'lucide-react';
import { Button } from '../ui';

const VAT = 10; // НДС
const DELIVERY_PRICE = 250;

interface Props {
    totalAmount: number;
    className?: string;
}

export const CheckoutSidebar: React.FC<Props> = ({ totalAmount,className }) => {
    
        const vatPrice = (totalAmount * VAT) / 100;
        const totalPrice = totalAmount + DELIVERY_PRICE + vatPrice
    
    return (
        <WhiteBlock className="p-6 sticky top-4">
            <div className="flex flex-col gap-1">
                <span className="text-xl">Итого:</span>
                <span className="text-[34px] font-extrabold">{totalPrice} ₽</span>
            </div>
            <CheckoutItemDetails title={
                <div className="flex items-center">
                    <Package className='mr-2 text-gray-300' size={18} />
                    Стоимость корзины:
                </div>
            } value={`${totalAmount} ₽`} />
            <CheckoutItemDetails title={
                <div className="flex items-center">
                    <Percent className='mr-2 text-gray-300' size={18} />
                    Налоги:
                </div>
            } value={`${vatPrice} ₽`} />
            <CheckoutItemDetails title={
                <div className="flex items-center">
                    <Truck className='mr-2 text-gray-300' size={18} />
                    Доставка:
                </div>
            } value={`${DELIVERY_PRICE} ₽`} />

            <Button type='submit' className='w-full mt-6'>
                Перейти к оплате
                <ArrowRight className='w-5 ml-2' />
            </Button>
        </WhiteBlock>
    );
};
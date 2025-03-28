import React from 'react';
import { WhiteBlock } from './white-block';
import { CheckoutItemDetails } from './checkout-item-details';
import { ArrowRight, Package, Percent, Truck } from 'lucide-react';
import { Button, Skeleton } from '../ui';

const VAT = 10; // НДС
const DELIVERY_PRICE = 250;

interface Props {
    totalAmount: number;
    loading?: boolean;
    className?: string;
}

export const CheckoutSidebar: React.FC<Props> = ({ totalAmount, loading, className }) => {

    const vatPrice = (totalAmount * VAT) / 100;
    const totalPrice = totalAmount + DELIVERY_PRICE + vatPrice

    return (
        <WhiteBlock className="p-6 sticky top-4">
            <div className="flex flex-col gap-1">
                <span className="text-xl">Итого:</span>
                {
                    loading
                        ? <Skeleton className='w-48 h-11' />
                        : <span className="h-11 text-[34px] font-extrabold">{totalPrice} ₽</span>
                }
            </div>
            <CheckoutItemDetails title={
                <div className="flex items-center">
                    <Package className='mr-2 text-gray-300' size={18} />
                    Стоимость корзины:
                </div>
            } value={
                loading
                    ? <Skeleton className='w-16 h-6 rounded-[6px]' />
                    : `${totalAmount} ₽`
            } />
            <CheckoutItemDetails title={
                <div className="flex items-center">
                    <Percent className='mr-2 text-gray-300' size={18} />
                    Налоги:
                </div>
            } value={
                loading
                    ? <Skeleton className='w-16 h-6 rounded-[6px]' />
                    : `${vatPrice} ₽`
            } />
            <CheckoutItemDetails title={
                <div className="flex items-center">
                    <Truck className='mr-2 text-gray-300' size={18} />
                    Доставка:
                </div>
            } value={
                loading
                    ? <Skeleton className='w-16 h-6 rounded-[6px]' />
                    : `${DELIVERY_PRICE} ₽`
            } />

            <Button loading={loading} type='submit' className='w-full mt-6'>
                Перейти к оплате
                <ArrowRight className='w-5 ml-2' />
            </Button>
        </WhiteBlock>
    );
};
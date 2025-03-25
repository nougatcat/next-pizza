import React from 'react';
import { WhiteBlock } from '../white-block';
import { Input, Textarea } from '../../ui';

interface Props {
    className?: string;
}

export const CheckoutAddressForm: React.FC<Props> = ({ className }) => {
    return (
        <WhiteBlock title='3. Адрес доставки' className='mb-8'>
        <div className="flex flex-col gap-5">
            <Input name="address" className="text-base" placeholder="Введите адрес..." />
            <Textarea
                rows={5}
                className="text-base"
                placeholder="Комментарии к заказу"
            />
        </div>
    </WhiteBlock>
    );
};
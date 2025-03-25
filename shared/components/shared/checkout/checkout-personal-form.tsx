import React from 'react';
import { WhiteBlock } from '../white-block';
import { FormInput } from '../form';
import { Input } from '../../ui';


interface Props {
    className?: string;
}

export const CheckoutPersonalForm: React.FC<Props> = ({ className }) => {
    return (
        <WhiteBlock title='2. Персональные данные' className='mb-8'>
            <div className="grid grid-cols-2 gap-5">
                <Input name="fisrtName" className="text-base" placeholder="Имя" />
                <Input name="lastName" className="text-base" placeholder="Фамилия" />
                <Input name="email" className="text-base" placeholder="E-mail" />
                <FormInput name="phone" className="text-base" placeholder="Телефон" />
            </div>
        </WhiteBlock>
    );
};
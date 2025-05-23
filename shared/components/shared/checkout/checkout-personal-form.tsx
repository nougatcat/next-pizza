import React from 'react';
import { WhiteBlock } from '../white-block';
import { FormInput } from '../form';
import { Input } from '../../ui';


interface Props {
    className?: string;
}

export const CheckoutPersonalForm: React.FC<Props> = ({ className }) => {
    return (
        <WhiteBlock title='2. Персональные данные' className={className}>
            <div className="grid grid-cols-2 gap-5">
                <FormInput name="firstName" className="text-base" placeholder="Имя" />
                <FormInput name="lastName" className="text-base" placeholder="Фамилия" />
                <FormInput name="email" className="text-base" placeholder="E-mail" />
                <FormInput name="phone" className="text-base" placeholder="Телефон" />
            </div>
        </WhiteBlock>
    );
};
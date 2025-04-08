'use client'
import React from 'react';
import { WhiteBlock } from '../white-block';
import { FormTextarea } from '../form';
import { AddressInput } from '../address-input';
import { Controller, useFormContext } from 'react-hook-form';
import { ErrorText } from '../error-text';

interface Props {
    className?: string;
}

export const CheckoutAddressForm: React.FC<Props> = ({ className }) => {
    const { control } = useFormContext() //use client используется из-за этого хука
    return (
        <WhiteBlock title='3. Адрес доставки' className={className}>
            <div className="flex flex-col gap-5">
                {/* <Input name="address" className="text-base" placeholder="Введите адрес..." /> */}
                {/* оборачивание в контроллер нужно чтобы addressinput c react-dadata правильно валидировался */}
                <Controller
                    control={control}
                    name="address"
                    render={({ field, fieldState }) =>
                        <>
                            <AddressInput onChange={field.onChange} />
                            {fieldState.error?.message && <ErrorText text={fieldState.error.message} />}
                        </>
                    }
                />


                <FormTextarea
                    name="comment"
                    rows={5}
                    className="text-base"
                    placeholder="Комментарии к заказу"
                />
            </div>
        </WhiteBlock>
    );
};
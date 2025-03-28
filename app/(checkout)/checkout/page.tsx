'use client'

import { useCart } from "@/shared/hooks";
import { 
    CheckoutSidebar, 
    Container, 
    Title, 
    CheckoutAddressForm, 
    CheckoutCart, 
    CheckoutPersonalForm 
} from "@/shared/components";

import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { checkoutFormSchema, CheckoutFormValues } from "@/shared/constants";
import { createOrder } from "@/app/actions";
import toast from "react-hot-toast";
import React from "react";


export default function CheckoutPage() {
    const [submitting, setSubmitting] = React.useState(false)
    const { totalAmount, items, updateItemQuantity, removeCartItem, loading } = useCart()

    const form = useForm<CheckoutFormValues>({
        resolver: zodResolver(checkoutFormSchema),
        defaultValues: {
            email: '',
            firstName: '',
            lastName: '',
            phone: '',
            address: '',
            comment: '',
        }
    })

    const onSubmit = async (data: CheckoutFormValues) => {
        try {
            setSubmitting(true)
            const url = await createOrder(data)
            toast.success('Заказ успешно создан! Переход на оплату...', {icon: '✅'})
            if (url) {
                location.href = url
            }
        } catch(err) {
            console.log(err)
            setSubmitting(false)
            toast.error('Не удалось создать заказ', {icon: '❌'})
        }
    }

    const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
        const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
        updateItemQuantity(id, newQuantity)
    }

    return (
        <Container className='mt-1'>
            <Title text='Оформление заказа' className='font-extrabold mb-8 text-[36px]' />

            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex gap-10">
                        {/* left side */}
                        <div className="flex flex-col gap-10 flex-1 mb-20">
                            <CheckoutCart
                                items={items}
                                removeCartItem={removeCartItem}
                                onClickCountButton={onClickCountButton}
                                loading={loading}
                            />
                            <CheckoutPersonalForm className={loading ? "opacity-40 pointer-events-none" : ''} />
                            {/* //? pointer-events-none полностью убирает возможность клика на элемент */}
                            <CheckoutAddressForm className={loading ? "opacity-40 pointer-events-none" : ''}/>
                        </div>
                        {/* right side */}
                        <div className="w-[450px]">
                            <CheckoutSidebar 
                                totalAmount={totalAmount} 
                                loading={loading || submitting} 
                            />
                        </div>
                    </div>
                </form>
            </FormProvider>
        </Container>
    )
}
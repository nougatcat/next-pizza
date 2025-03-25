'use client'
import { CheckoutSidebar, Container, Title } from "@/shared/components/shared";
import { useCart } from "@/shared/hooks";
import { CheckoutAddressForm, CheckoutCart, CheckoutPersonalForm } from "@/shared/components/shared/checkout";

import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'


// const form = useForm({
//     resolver: zodResolver(),
//     defaultValues: {
//         email: '',
//         firstName: '',
//         lastName: '',
//         phone: '',
//         address: '',
//         comment: '',
//     }
// })

export default function CheckoutPage() {
    const { totalAmount, items, updateItemQuantity, removeCartItem } = useCart()

    const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
        const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
        updateItemQuantity(id, newQuantity)
    }

    return (
        <Container className='mt-1'>
            <Title text='Оформление заказа' className='font-extrabold mb-8 text-[36px]' />

            <div className="flex gap-10">
                {/* left side */}
                <div className="flex flex-col gap-10 flex-1 mb-20">
                    <CheckoutCart
                        items={items}
                        removeCartItem={removeCartItem}
                        onClickCountButton={onClickCountButton}
                    />
                    <CheckoutPersonalForm />
                    <CheckoutAddressForm />
                </div>

                {/* right side */}
                <div className="w-[450px]">
                    <CheckoutSidebar totalAmount={totalAmount} />
                </div>
            </div>
        </Container>
    )
}
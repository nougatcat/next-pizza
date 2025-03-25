'use client'
import { CheckoutItem, CheckoutSidebar, Container, Title, WhiteBlock } from "@/shared/components/shared";
import { Input, Textarea } from "@/shared/components/ui";
import { PizzaSize, PizzaType } from "@/shared/constants/pizza";
import { useCart } from "@/shared/hooks";
import { getCartItemDetails } from "@/shared/lib";




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
                    <WhiteBlock title='1. Корзина'>
                        <div className="flex flex-col gap-5">
                            {
                                items.map((item) => (
                                    <CheckoutItem
                                        key={item.id}
                                        id={item.id}
                                        imageUrl={item.imageUrl}
                                        details={
                                            getCartItemDetails(
                                                item.ingredients,
                                                item.pizzaType as PizzaType,
                                                item.pizzaSize as PizzaSize
                                            )
                                        }
                                        name={item.name}
                                        price={item.price}
                                        quantity={item.quantity}
                                        disabled={item.disabled}
                                        onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)}
                                        onClickRemove={() => removeCartItem(item.id)}
                                    />
                                ))
                            }
                            {/* <CheckoutItem
                                id={1}
                                imageUrl={'https://media.dodostatic.net/image/r:292x292/11EE7970321044479C1D1085457A36EB.webp'}
                                details={'шаблонные детали'}
                                name={'шаблонная пицца'}
                                price={500}
                                quantity={10}
                            /> */}
                        </div>
                    </WhiteBlock>
                    <WhiteBlock title='2. Персональные данные' className='mb-8'>
                        <div className="grid grid-cols-2 gap-5">
                            <Input name="fisrtName" className="text-base" placeholder="Имя" />
                            <Input name="lastName" className="text-base" placeholder="Фамилия" />
                            <Input name="email" className="text-base" placeholder="E-mail" />
                            <Input name="phone" className="text-base" placeholder="Телефон" />
                        </div>
                    </WhiteBlock>
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

                </div>

                {/* right side */}
                <div className="w-[450px]">
                    <CheckoutSidebar totalAmount={totalAmount} />
                </div>
            </div>
        </Container>
    )
}
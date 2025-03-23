import { CheckoutItemDetails, Container, Title, WhiteBlock } from "@/shared/components/shared";
import { Input, Textarea } from "@/shared/components/ui";
import { Package, Percent, Truck } from "lucide-react";

export default function CheckoutPage() {
    return (
        <Container className='mt-1'>
            <Title text='Оформление заказа' className='font-extrabold mb-8 text-[36px]' />

            <div className="flex gap-10">
                {/* left side */}
                <div className="flex flex-col gap-10 flex-1 mb-20">
                    <WhiteBlock title='1. Корзина'>
                        111
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
                    <WhiteBlock className="p-6 sticky top-4">
                        <div className="flex flex-col gap-1">
                            <span className="text-xl">Итого:</span>
                            <span className="text-[34px] font-extrabold">10000 ₽</span>
                        </div>
                        <CheckoutItemDetails title={
                            <div className="flex items-center">
                                <Package className='mr-2 text-gray-300' size={18} />
                                Стоимость товаров:
                            </div>
                        } value='9000 ₽' />
                        <CheckoutItemDetails title={
                            <div className="flex items-center">
                                <Percent className='mr-2 text-gray-300' size={18} />
                                Налоги:
                            </div>
                        } value='900 ₽' />
                        <CheckoutItemDetails title={
                            <div className="flex items-center">
                                <Truck className='mr-2 text-gray-300' size={18} />
                                Доставка:
                            </div>
                        } value='100 ₽' />
                    </WhiteBlock>
                </div>
            </div>
        </Container>
    )
}
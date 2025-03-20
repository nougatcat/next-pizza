'use client';

import { Dialog, DialogContent } from '@/shared/components/ui';
import { cn } from '@/shared/lib/utils';
import { useRouter } from 'next/navigation';
import { ChooseProductForm } from '../choose-product-form';
import { ProductWithRelations } from '@/@types/prisma';
import { ChoosePizzaForm } from '../choose-pizza-form';
import { useCartStore } from '@/shared/store';
import toast from 'react-hot-toast';

interface Props {
    product: ProductWithRelations
    className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
    const router = useRouter()
    const firstItem = product.items[0]
    const isPizzaForm = Boolean(firstItem.pizzaType) //проверка продукта на пиццу, у других продуктов нет items
    const addCartItem = useCartStore((state) => state.addCartItem)

    const onAddProduct = () => {
        addCartItem({
            productItemId: firstItem.id,
        })
    }

    const onAddPizza = async (productItemId: number, ingredients: number[]) => {
        try {
            await addCartItem({
                productItemId,
                ingredients
            })
            toast.success('Пицца добавлена в корзину')
        } catch (error) {
            toast.error('Не удалось добавить пиццу в корзину')
            console.error(error)
        }
    }

    return (
        <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
            {/* open - открывать окно только если есть продукт */}
            <DialogContent
                className={
                    cn(
                        'p-0 w-[1060px] max-w-[1060px] min-h-[550px] bg-white overflow-hidden',
                        className
                    )}>
                {
                    isPizzaForm ? (
                        <ChoosePizzaForm
                            imageUrl={product.imageUrl}
                            name={product.name}
                            ingredients={product.ingredients}
                            items={product.items}
                            onSubmit={onAddPizza}
                        />
                    ) : <ChooseProductForm
                        imageUrl={product.imageUrl}
                        name={product.name}
                        onSubmit={onAddProduct}
                        price={firstItem.price}
                    />
                }
            </DialogContent>
        </Dialog>
    );
};
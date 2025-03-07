'use client';

import { Dialog, DialogContent } from '@/shared/components/ui';
import { cn } from '@/shared/lib/utils';
import { useRouter } from 'next/navigation';
import { ChooseProductForm } from '../choose-product-form';
import { ProductWithRelations } from '@/@types/prisma';
import { ChoosePizzaForm } from '../choose-pizza-form';

interface Props {
    product: ProductWithRelations
    className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
    const router = useRouter()
    const isPizzaForm = Boolean(product.items[0].pizzaType) //проверка продукта на пиццу, у других продуктов нет items
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
                        <ChoosePizzaForm imageUrl={product.imageUrl} name={product.name} ingredients={product.ingredients} />
                    ) : <ChooseProductForm imageUrl={product.imageUrl} name={product.name} />
                }
            </DialogContent>
        </Dialog>
    );
};
'use client'
import { ProductWithRelations } from '@/@types/prisma';
import { useCartStore } from '@/shared/store';
import React from 'react';
import toast from 'react-hot-toast';
import { ChoosePizzaForm } from './choose-pizza-form';
import { ChooseProductForm } from './choose-product-form';

interface Props {
    product: ProductWithRelations;
    onSubmit?: VoidFunction;
}

export const ProductForm: React.FC<Props> = ({ product, onSubmit: _onSubmit}) => {
    const { addCartItem, loading } = useCartStore()
    const firstItem = product.items[0]
    const isPizzaForm = Boolean(firstItem.pizzaType) //проверка продукта на пиццу, у других продуктов нет items
    const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
        try {
            const itemId = productItemId ?? firstItem.id //productItemId не null/undefined - то его, иначе firstItem.id. productItemId может быть только у пицц
            addCartItem({
                productItemId: itemId,
                ingredients //если его нет (у не пиццы его нет), то просто ничего не передастся
            })
            toast.success(product.name + ' добавили в корзину')
            _onSubmit?.() //закрытие модала автоматически после добавления товара в корзину
        } catch (error) {
            toast.error('Не удалось добавить товар в корзину')
            console.error(error)
        }
    }
    if (isPizzaForm) {
        return (
            <ChoosePizzaForm
                imageUrl={product.imageUrl}
                name={product.name}
                ingredients={product.ingredients}
                items={product.items}
                onSubmit={onSubmit}
                loading={loading}
            />
        )
    }
    return (
        <ChooseProductForm
            imageUrl={product.imageUrl}
            name={product.name}
            onSubmit={onSubmit}
            price={firstItem.price}
            loading={loading}
        />
    )
};
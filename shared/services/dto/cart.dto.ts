// DTO - описание того, что возвращается с сервера

import { Cart, CartItem, Ingredient, Product, ProductItem } from "@prisma/client";

export type CartItemDTO = CartItem & {
    productItem: ProductItem & {
        product: Product
    };
    ingredients: Ingredient[]
}

export interface CartDTO extends Cart {
    items: CartItemDTO[]
}

export interface CreateCartItemValues {
    productItemId: number
    // pizzaSize?: number эти 2 параметра не нужны на бэкенде т.к. productItemId уже содержит их
    // pizzaType?: number
    ingredients?: number[]
}
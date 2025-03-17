import { prisma } from "@/prisma/prisma-client"
import { calcCartItemTotalPrice } from "./calc-cart-item-total-price";

export const updateCartTotalAmount = async (token: string) => {
    //найти нашу корзину 
    const userCart = await prisma.cart.findFirst({
        where: {
            token
        },
        //вместе с корзиной верни
        include: {
            items: {
                orderBy: {
                    createdAt: 'desc'
                },
                include: {
                    productItem: {
                        include: {
                            product: true,
                        },
                    },
                    ingredients: true,
                },
            },
        },
    });

    if (!userCart) {
        return //вернет undefined
    }

    //вычислить общую стоимость корзины
    const totalAmount = userCart.items.reduce((acc,item) => {
        return acc + calcCartItemTotalPrice(item)
    }, 0);

    // обновить корзину
    return await prisma.cart.update({
        where: {
            id: userCart.id
        },
        data: {
            totalAmount,
        },
        include: {
            items: {
                orderBy: {
                    createdAt: 'desc'
                },
                include: {
                    productItem: {
                        include: {
                            product: true,
                        },
                    },
                    ingredients: true,
                },
            },
        },
    })
}
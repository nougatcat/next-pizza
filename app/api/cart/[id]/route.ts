import { prisma } from "@/prisma/prisma-client";
import { updateCartTotalAmount } from "@/shared/lib";
import { NextRequest, NextResponse } from "next/server";

//PATCH отправляет запрос на изменение поля в виде измененного фрагмента этого поля
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = Number(params.id)
        const data = (await req.json()) as { quantity: number }
        const token = req.cookies.get('cartToken')?.value

        if (!token) {
            return NextResponse.json({ error: 'Cart token was not found' })
        }

        const cartItem = await prisma.cartItem.findFirst({
            where: {
                id,
            }
            // where: {
            //     id: id,
            // } то же, что и сверху, но более понятно
        })

        if (!cartItem) {
            return NextResponse.json({ error: 'Cart item was not found' })
        }

        // вытащить количество товаров, которое необходимо обновить и обновить это кол-во по адресу cart/[id]
        await prisma.cartItem.update({
            where: {
                id,
            },
            data: {
                quantity: data.quantity
            }
        })

        //обновить саму корзину
        const updatedUserCart = await updateCartTotalAmount(token)

        return NextResponse.json(updatedUserCart)

    } catch (error) {
        console.log('[CART_PATCH] Server error', error);
        return NextResponse.json({ message: 'Не удалось обновить корзину' }, { status: 500 })
    }
} 


//! на 12:08 описание запроса в постмане
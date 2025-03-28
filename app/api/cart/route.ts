import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";
import crypto from 'crypto'
import { findOrCreateCart } from "@/shared/lib/find-or-create-cart";
import { CreateCartItemValues } from "@/shared/services/dto/cart.dto";
import { updateCartTotalAmount } from "@/shared/lib";

//получаем корзину
export async function GET(req: NextRequest) {
    try {
        //? стандартный токен 111111 для тестового юзера можно захардкодить в куки через инструмент разработчика
        const token = req.cookies.get('cartToken')?.value

        if (!token) {
            return NextResponse.json({ totalAmount: 0, items: [] }) //пустая корзина
        }

        const userCart = await prisma.cart.findFirst({
            // у юзера должен быть токен, у незареганных тоже должен быть токен
            where: {
                // можно тут не использовать ор. Это было нужно когда проверяли есть ли userId
                OR: [
                    {
                        token,
                    }
                ]
            },
            include: {
                items: {
                    // Чтобы выполнить сортировку в обратном порядке, указываем DESC, то есть самые новые будут первыми
                    orderBy: {
                        createdAt: 'desc'
                    },
                    include: {
                        productItem: {
                            include: {
                                product: true
                            }
                        },
                        ingredients: true
                    }
                }
            },
        })

        return NextResponse.json(userCart)
    } catch (error) {
        console.log('[CART_GET] Server error', error)
        return NextResponse.json({ message: 'Не удалось получить корзину' }, { status: 500 })
    }
}

//создаем корзину
export async function POST(req: NextRequest) {
    try {
        let token = req.cookies.get('cartToken')?.value

        if (!token) {
            token = crypto.randomUUID()
        }

        const userCart = await findOrCreateCart(token)

        const data = (await req.json()) as CreateCartItemValues

        const findCartItem = await prisma.cartItem.findFirst({
            where: {
                cartId: userCart.id,
                productItemId: data.productItemId, //id вариации товара (т.е. какой размер и какое тесто)
                ingredients: {
                    every: {
                        id: { in: data.ingredients }
                    },
                    some: {} // ! это БАГФИКС / костыль - без него пиццы с разными ингредиентами стакаются вместе в корзине 
                }
            },
            include: {
                ingredients: true
            }
        })

        // Если нашли совпадение, то увеличиваем количество этого товара в корзине на 1
        if (findCartItem) {
            await prisma.cartItem.update({
                where: {
                    id: findCartItem.id
                },
                data: {
                    quantity: findCartItem.quantity + 1,
                },
            })
        } else {
            // случай, когда не нашли совпадение и нужно создать отдельный cartItem
            await prisma.cartItem.create({
                data: {
                    cartId: userCart.id,
                    productItemId: data.productItemId,
                    quantity: 1,
                    ingredients: { connect: data.ingredients?.map((id) => ({ id })) }
                }
            })
        }

        const updatedUserCart = await updateCartTotalAmount(token)
        const resp = NextResponse.json(updatedUserCart)
        resp.cookies.set('cartToken', token) // добавляем куки к ответу и сохраняем токен в куки, т.к. его там может не быть
        return resp

    } catch (error) {
        console.log('[CART_POST] Server error', error)
        return NextResponse.json({ message: 'Не удалось создать корзину' }, { status: 500 })
    }
}

//! пример теста запроса в постмане на 12:51. Не забывать вшивать токен в куки!!!
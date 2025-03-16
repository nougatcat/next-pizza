import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        //? стандартный токен 111111 для тестового юзера захардкожен в куки через инструмент разработчика
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
        console.log(error)
    }
}
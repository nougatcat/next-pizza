// server actions
'use server';

import { prisma } from "@/prisma/prisma-client";
import { PayOrderTemplate, VerificationUserTemplate } from "@/shared/components";
import { CheckoutFormValues } from "@/shared/constants";
import { createPayment, sendEmail } from "@/shared/lib";
import { getUserSession } from "@/shared/lib/get-user-session";
import { OrderStatus, Prisma } from "@prisma/client";
import { hashSync } from "bcrypt";
import { cookies } from "next/headers";

export async function createOrder(data: CheckoutFormValues) {
    try {
        const cookieStore = cookies() // получаем куки. Получить из req тут их нельзя, но можно так
        const cartToken = cookieStore.get('cartToken')?.value
        if (!cartToken) {
            throw new Error('Cart token not found')
        }
        // Находим корзину по токену
        const userCart = await prisma.cart.findFirst({
            include: {
                user: true,
                items: {
                    include: {
                        ingredients: true,
                        productItem: {
                            include: {
                                product: true,
                            },
                        },
                    },
                },
            },
            where: {
                token: cartToken,
            },
        });

        //  Если корзина не найдена, возвращаем ошибку
        if (!userCart) {
            throw new Error('Cart not found')
        }
        // Если корзина пуста, возвращаем ошибку
        if (userCart?.totalAmount === 0) {
            throw new Error('Cart is empty')
        }
        // Создаем заказ
        const order = await prisma.order.create({
            data: {
                token: cartToken,
                fullName: data.firstName + ' ' + data.lastName,
                email: data.email,
                phone: data.phone,
                address: data.address,
                comment: data.comment,
                totalAmount: userCart.totalAmount, //! записывается цена без учета налога и доставки
                status: OrderStatus.PENDING,
                items: JSON.stringify(userCart.items) //! json stringify делает items строкой, чтобы в письме потом спарсить ее
                // items: userCart.items
            },
        })

        // Очищаем корзину
        await prisma.cart.update({
            where: {
                // token: cartToken,
                id: userCart.id
            },
            data: {
                totalAmount: 0
            }
        })
        await prisma.cartItem.deleteMany({
            where: {
                cartId: userCart.id
            }
        })
        // TODO: Сделать создание ссылки оплаты

        const paymentData = await createPayment({
            amount: order.totalAmount,
            orderId: order.id,
            description: 'Оплата заказа #' + order.id,
        })

        if (!paymentData) {
            throw new Error('Payment data not found')
        }

        await prisma.order.update({
            where: {
                id: order.id
            },
            data: {
                paymentId: paymentData.id
            }
        })

        const paymentUrl = paymentData.confirmation.confirmation_url

        await sendEmail(data.email, 'Next Pizza / Оплатите заказ №' + order.id, PayOrderTemplate({
            orderId: order.id,
            totalAmount: order.totalAmount,
            paymentUrl,
        }))
        return paymentUrl
    } catch (err) {
        console.log('[CreateOrder] Server error', err)
    }
}

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
    try {
        const currentUser = await getUserSession()

        if (!currentUser) {
            throw new Error('Пользователь не найден')
        }

        const findUser = await prisma.user.findFirst({
            where: {
                id: Number(currentUser.id)
            }
        })

        await prisma.user.update({
            where: {
                id: Number(currentUser.id)
            },
            data: {
                fullName: body.fullName,
                email: body.email,
                password: body.password ? hashSync(body.password as string,10) : findUser?.password
                // тут проверка нужна на случай если не меняли пароль, но меняли имя и/или почту
            }
        })
    } catch (err) {
        console.log('Error [UPDATE_USER]', err)
        throw err;
    }
}

export async function registerUser(body: Prisma.UserCreateInput) {
    try {
        const user = await prisma.user.findFirst({
            where: {
                email: body.email,
            }
        })

        if (user) {
            if (!user.verified) {
                throw new Error('Почта не подтверждена');
            }
            throw new Error('Пользователь с такой почтой уже существует');
        }

        const createdUser = await prisma.user.create({
            data: {
                fullName: body.fullName,
                email: body.email,
                password: hashSync(body.password,10)
            }
        })

        // генерим код подтверждения почты
        const code = Math.floor(10000 + Math.random() * 90000).toString()

        await prisma.verificationCode.create({
            data: {
                code,
                userId: createdUser.id
            }
        })

        await sendEmail(createdUser.email, 
            'Next Pizza / 📝 Подтверждение регистрации', VerificationUserTemplate({
                code
        }))
    } catch (err) {
        console.log('Error [REGISTER_USER]', err)
    }
}
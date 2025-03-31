// /api/checkout/callback

import { PaymentCallbackData } from "@/@types/yookassa";
import { prisma } from "@/prisma/prisma-client";
import { OrderFailTemplate } from "@/shared/components/shared/email-templates/order-fail";
import { OrderSuccessTemplate } from "@/shared/components/shared/email-templates/order-success";
import { sendEmail } from "@/shared/lib";
import { CartItemDTO } from "@/shared/services/dto/cart.dto";
import { OrderStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = (await req.json()) as PaymentCallbackData
        const order = await prisma.order.findFirst({
            where: {
                id: Number(body.object.metadata.order_id),
            },
        })
        if (!order) {
            return NextResponse.json('Order not found')
        }

        const isSucceeded = body.object.status === 'succeeded'

        await prisma.order.update({
            where: {
                id: order.id,
            },
            data: {
                status: isSucceeded ? OrderStatus.SUCCEEDED : OrderStatus.CANCELED
            }
        })
        const items = JSON.parse(order?.items as string) as CartItemDTO[]

        if (isSucceeded) {
            await sendEmail(
                order.email,
                'Next Pizza | Ваш заказ успешно оформлен 🎉',
                OrderSuccessTemplate({ orderId: order.id, items })
            )
            return NextResponse.json('Success')
        } else {
            await sendEmail(
                order.email,
                'Next Pizza | Ваш заказ не удалось оформить',
                OrderFailTemplate({ orderId: order.id})
            )
            return NextResponse.json('Fail')
        }

    } catch (error) {
        console.log('[Checkout Callback] Error',error)
        return NextResponse.json('Server Error')
    }
}


//! ВАЖНО юкасса не сможет прислать обратный реквест, если не запущен localtunnel и его ip не введен в настройках юкассы. Это актуально пока сайт существует только на локалхосте. Потом можно использовать хостинг
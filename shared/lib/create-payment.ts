import { PaymentData } from "@/@types/yookassa";
import axios from "axios";

interface Props {
    description: string
    orderId: number
    amount: number
}
/** Функция создания платежа через юкассу */
export async function createPayment(details: Props) {
    const { data } = await axios.post<PaymentData>(
        'https://api.yookassa.ru/v3/payments', {
        amount: {
            value: details.amount,
            currency: 'RUB',
        },
        capture: true,
        description: details.description,
        metadata: {
            order_id: details.orderId,
        },
        confirmation: {
            type: 'redirect',
            return_url: process.env.YOOKASSA_CALLBACK_URL
        },
    },
        {
            auth: {
                username: process.env.YOOKASSA_STORE_ID as string,
                password: process.env.YOOKASSA_API_KEY as string,
            },
            headers: {
                'Content-Type': 'application/json',
                // 'Idempotency-Key': Date.now().toString(),
                'Idempotence-Key': Math.random().toString(36).substring(7),
            } // инфа для юкассы чтобы отличать одинаковые платежи, тут может быть какое-то рандомное значение или дата
        }
    )

    return data
}
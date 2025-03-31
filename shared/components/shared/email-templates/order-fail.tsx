import { CartItemDTO } from '@/shared/services/dto/cart.dto';
import * as React from 'react';

interface Props {
    orderId: number;
}

export const OrderFailTemplate: React.FC<Props> = ({ orderId }) => (
    <div>
        <p>Ваш заказ #{orderId} не оплачен.</p>
    </div>
)
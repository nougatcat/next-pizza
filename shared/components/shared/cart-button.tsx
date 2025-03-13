import { cn } from '@/shared/lib/utils';
import React from 'react';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import { Button } from '../ui';
import { CartDrawer } from './cart-drawer';

interface Props {
    className?: string;
}

export const CartButton: React.FC<Props> = ({ className }) => {
    return (
        <CartDrawer>
            <Button className={cn('group relative',className)}> {/* group - общий стиль (нужно для анимации смены корзины на стрелку) */}
                <b>520 ₽</b>
                <span className='h-full w-[1px] bg-white/30 mx-3' /> {/* Разделитель */}
                <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
                    <ShoppingCart className="relative" size={16} strokeWidth={2} /> {/* strokeWidth - толщина svg элемента, size={16} - то же, что h-4,w-4, где h-4 значит height 16px */}
                    <b>3</b>
                </div>
                <ArrowRight size={20} className="absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0" />
                {/* //?При наведении на кнопку, корзина будет меняться на стрелку, потому что у них прописаны group и анимация в класснейме*/}
                {/* Если не использовать group, а писать просто hover, то анимация будет только при наведении на корзину, но не будет в любой части кнопки */}
            </Button>
        </CartDrawer>
    );
};
import { ChooseProductModal } from '@/components/shared';
import { prisma } from '@/prisma/prisma-client';
import { notFound } from 'next/navigation';
import React from 'react';

export default async function ProductModalPage({ params: { id } }: { params: { id: string } }) {
    const product = await prisma.product.findFirst({
        where: {
            id: Number(id)
        },
        include: {
            ingredients: true,
            items: true
        }
    })

    if (!product) {
        return notFound()
    }

    return <ChooseProductModal product={product} />
}

//! (8:34) если не работает параллельный роут, то нужно перезапустить, если не поможет - удалить папку .next/cache

//! (8:34) не работает закрытие модала - решение на 14:29 - постоянная подгрузка фильтров не дает модалу нормально перехватить окно, поэтому надо использовать useMemo
'use client';

import { Dialog, DialogContent } from '@/shared/components/ui';
import { cn } from '@/shared/lib/utils';
import { useRouter } from 'next/navigation';
import { ProductWithRelations } from '@/@types/prisma';
import React from 'react';
import { ProductForm } from '../product-form';

interface Props {
    product: ProductWithRelations
    className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
    const router = useRouter()

    return (
        <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
            {/* open - открывать окно только если есть продукт */}
            <DialogContent
                className={
                    cn(
                        'p-0 w-[1060px] max-w-[1060px] min-h-[550px] bg-white overflow-hidden',
                        className
                    )}>
                <ProductForm product={product} onSubmit={() => router.back()} />
            </DialogContent>
        </Dialog>
    );
};
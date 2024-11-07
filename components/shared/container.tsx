import { cn } from '@/lib/utils';
import React from 'react';

interface Props {
    className?: string;
}

/**
 * Оберточная компонента, которая делает центрирование и задает макс ширину
 */
export const Container: React.FC<React.PropsWithChildren<Props>> = ({ className, children }) => {
    return <div className={cn('mx-auto max-w-[1280px]', className)}>{children}</div>;
};



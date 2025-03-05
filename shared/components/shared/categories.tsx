//snippet trscp
'use client'
import { cn } from '@/shared/lib/utils';
import { useCategoryStore } from '@/shared/store/category';
import { Category } from '@prisma/client';
import React from 'react';

interface Props {
    items: Category[]
    className?: string;
}

// //categories

// const cats = [
//     {id: 1, name: 'Пиццы'},
//     {id: 2, name: 'Завтрак'},
//     {id: 3, name: 'Закуски'},
//     {id: 4, name: 'Коктейли'},
//     {id: 5, name: 'Кофе'},
//     {id: 6, name: 'Напитки'},
//     {id: 7, name: 'Десерты'},
//     {id: 8, name: 'Комбо'},
// ]


export const Categories: React.FC<Props> = ({ items, className }) => {
    const categoryActiveId = useCategoryStore((state) => state.activeId)
    
    return (
        <div className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl', className)}>
            {
                items.map(({name, id}, index) => (
                    <a
                        className={cn(
                            'flex items-center font-bold h-11 rounded-2xl px-5',
                            categoryActiveId === id && 'bg-white shadow-md shadow-gray-200 text-primary',
                        )}
                        href={`/#${name}`} //для перехода на нужную категорию из меню с пом. якоря
                        key={index}>
                        <button>{name}</button>
                    </a>
                ))
            }
        </div>
    );
};

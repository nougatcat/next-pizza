'use client'
import React from 'react';
import { Title } from './title';
import { FilterCheckbox } from './filter-checkbox';
import { Input, RangeSlider } from '../ui';
import { CheckboxFiltersGroup } from './checkbox-filters-group';
import { useFilterIngredients } from '@/hooks/useFilterIngredients';

interface Props {
    className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
    const { ingredients, loading, onAddId, selectedIds } = useFilterIngredients()
    const items = ingredients.map((item) => ({ value: String(item.id), text: item.name }))

    return (
        <div className={className}>
            <Title text='Фильтрация' size='sm' className='mb-5 font-bold' />
            {/* Верхние чекбоксы */}
            <div className='flex flex-col gap-4'>
                <FilterCheckbox name='qwe' text="Можно собирать" value='1' />
                <FilterCheckbox name='asdasd' text="Новинки" value='2' />
            </div>
            {/* Фильтр цен */}
            <div className='mt-5 border-y border-y-neutral-100 py-6 pb-7'>
                <p className='font-bold mb-3'>Цена от и до: </p>
                <div className="flex gap-3 mb-5">
                    <Input type="number" placeholder="0" min={0} max={1000} defaultValue={0} />
                    <Input type="number" min={100} max={1000} placeholder="1000" />
                </div>
                <RangeSlider min={0} max={5000} step={10} value={[0, 5000]} />
            </div>
            <CheckboxFiltersGroup
                title='Ингредиенты:'
                name='ingredients'
                className='mt-5'
                limit={6}
                defaultItems={items.slice(0, 6)}
                items={items}
                loading={loading}
                OnClickCheckbox={onAddId}
                selectedIds={selectedIds}
            />
        </div>
    );
};
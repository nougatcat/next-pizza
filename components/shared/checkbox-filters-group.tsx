import React from 'react';
import { FilterChecboxProps, FilterCheckbox } from './filter-checkbox';
import { Input } from '../ui';

type Item = FilterChecboxProps;

interface Props {
    title: string;
    items: Item[];
    defaultItems?: Item[];
    limit?: number;
    searchInputPlaceholder?: string;
    OnChange?: (vakues: string[]) => void; //какие чекбоксы выбрали
    defaultValue?: string[];
    className?: string;
}

export const CheckboxFiltersGroup: React.FC<Props> = (
    { title, items, defaultItems, limit = 5, searchInputPlaceholder = 'Поиск...', OnChange, defaultValue, className }
) => {
    return (
        <div className={className}>
            <p className='font-bold mb-3'>{title}</p>
            <div className='mb-5'>
                <Input placeholder={searchInputPlaceholder} className='bg-gray-50 border-none' />
            </div>
            <div className='flex flex-col gap-4 hax-h-96 pr-2 overflow-auto scrollbar'>
                {items.map((item, index) => (
                    <FilterCheckbox
                        key={index}
                        text={item.text}
                        value={item.value}
                        endAdornment={item.endAdornment}
                        checked={false}
                        onCheckedChange={(ids) => console.log(ids)} //при каждом клике на чекбокс в стейт сохр его значение (пока что только консоль лог)
                    />
                ))}
            </div>
        </div>
    );
};
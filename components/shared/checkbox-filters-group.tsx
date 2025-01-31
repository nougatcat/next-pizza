'use client'
import React from 'react';
import { FilterChecboxProps, FilterCheckbox } from './filter-checkbox';
import { Input, Skeleton } from '../ui';

type Item = FilterChecboxProps;

interface Props {
    title: string;
    items: Item[];
    defaultItems: Item[];
    limit?: number;
    loading: boolean;
    searchInputPlaceholder?: string;
    OnClickCheckbox?: (id: string) => void; //какие чекбоксы выбрали
    defaultValue?: string[];
    selectedIds?: Set<string>;
    name?: string;
    className?: string;
}

export const CheckboxFiltersGroup: React.FC<Props> = (
    { title, 
        items, 
        defaultItems, 
        limit = 5, 
        searchInputPlaceholder = 'Поиск...',
        loading, 
        OnClickCheckbox,
        name, 
        defaultValue, 
        selectedIds, 
        className }
) => {
    const [showAll, setShowAll] = React.useState(false);

    // реализация поиска
    const [searchValue, setSearchValue] = React.useState('');
    const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    }
    if (loading) {
        return <div className={className}>
            <div className="font-bold mb-3">{title}
                {
                    ...Array(limit).fill(0).map((_,index) => (
                        <Skeleton key={index} className='h-6 mb-4 rounded=[8px]' />
                    ))
                }
                {/* я не могу понять, для чего тут нужен ... спред оператор - без него все работает */}
                <Skeleton className='w-28 h-6 mb-4 rounded-[8px]'/>
            </div>
        </div>
    }
    const list = showAll 
    ? items.filter((item) => item.text.toLowerCase().includes(searchValue.toLowerCase())) 
    : defaultItems.slice(0, limit); //лист включает в себя отфильтрованный с пом. поиска список элементов (или не отфильтрованный, если поле поиска пустое) при условии, что мы показываем их все
    ///

    return (
        <div className={className}>
            <p className='font-bold mb-3'>{title}</p>
            {showAll && (
                <div className='mb-5'>
                    <Input
                        onChange={onChangeSearchInput} 
                        placeholder={searchInputPlaceholder} 
                        className='bg-gray-50 border-none' />
                </div>
            )}
            <div className='flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar'>
                {list.map((item, index) => (
                    <FilterCheckbox
                        key={index}
                        text={item.text}
                        value={item.value}
                        endAdornment={item.endAdornment}
                        checked={selectedIds?.has(item.value)}
                        name={name}
                        onCheckedChange={() => OnClickCheckbox?.(item.value)} //при каждом клике на чекбокс в стейт сохр его значение
                    />
                ))}
            </div>
            {items.length > limit && (
                <div className={showAll ? 'border-t border-t-neutral-100 mt-4' : ' '}>
                    <button onClick={() => setShowAll(!showAll)} className='text-primary mt-3'>
                        {showAll ? 'Скрыть' : '+ Показать все'}
                    </button>
                </div>
            )}
        </div>
    );
};
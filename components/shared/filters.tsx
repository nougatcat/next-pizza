'use client'
import React from 'react';
import { Title } from './title';
import { Input, RangeSlider } from '../ui';
import { CheckboxFiltersGroup } from './checkbox-filters-group';
import { useFilterIngredients } from '@/hooks/useFilterIngredients';
import { useSet } from 'react-use';
import qs from 'qs'
import { useRouter, useSearchParams } from 'next/navigation';

interface Props {
    className?: string;
}

interface PriceProps {
    priceFrom?: number;
    priceTo?: number;
}

interface QueryFilters extends PriceProps {
    pizzaTypes: string;
    sizes: string;
    ingredients: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
    const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string> //получаем урл параметры
    const router = useRouter()
    const { ingredients, loading, onAddId, selectedIngredients} = useFilterIngredients(
        searchParams.get('ingredients')?.split(',')
    )
    const [prices, setPrice] = React.useState<PriceProps>({
        priceFrom: Number(searchParams.get('priceFrom')) || undefined,  //для сохранения урл после перезагрузки
        priceTo: Number(searchParams.get('priceTo')) || undefined
    })

    const [sizes, { toggle: toggleSizes }] = useSet(new Set<string>(searchParams.has('sizes') ? searchParams.get('sizes')?.split(','):[]))
    const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(new Set<string>(searchParams.has('pizzaTypes') ? searchParams.get('pizzaTypes')?.split(','):[]))

    const items = ingredients.map((item) => ({ value: String(item.id), text: item.name }))

    const updatePrice = (name: keyof PriceProps, value: number) => {
        setPrice({
            ...prices,
            [name]: value,
        })
    }

    React.useEffect(() => {
        const filters = {
            ...prices,
            pizzaTypes: Array.from(pizzaTypes),
            sizes: Array.from(sizes),
            ingredients: Array.from(selectedIngredients),
        }
        const query = qs.stringify(filters, {arrayFormat: 'comma'})
        router.push(`/?${query}`,{scroll: false})
    }, [prices, pizzaTypes, sizes, selectedIngredients, router])

    return (
        <div className={className}>
            <Title text='Фильтрация' size='sm' className='mb-5 font-bold' />
            {/* Верхние чекбоксы */}
            <CheckboxFiltersGroup
                title='Тип теста'
                name='pizzaTypes'
                className='mb-5'
                OnClickCheckbox={togglePizzaTypes}
                selected={pizzaTypes}
                items={[
                    { text: 'Тонкое', value: '1' },
                    { text: 'Толстое', value: '2' },
                ]}
            />
            <CheckboxFiltersGroup
                title='Размеры'
                name='sizes'
                className='mb-5'
                OnClickCheckbox={toggleSizes}
                selected={sizes}
                items={[
                    { text: '20 см', value: '20' },
                    { text: '30 см', value: '30' },
                    { text: '40 см', value: '40' },
                ]}
            />

            {/* Фильтр цен */}
            <div className='mt-5 border-y border-y-neutral-100 py-6 pb-7'>
                <p className='font-bold mb-3'>Цена от и до: </p>
                <div className="flex gap-3 mb-5">
                    <Input
                        type="number"
                        placeholder="0"
                        min={0}
                        max={1000}
                        defaultValue={0}
                        value={String(prices.priceFrom)}
                        onChange={(e) => updatePrice('priceFrom', Number(e.target.value))}
                    />
                    <Input
                        type="number"
                        min={100}
                        max={1000}
                        placeholder="1000"
                        value={String(prices.priceTo)}
                        onChange={(e) => updatePrice('priceTo', Number(e.target.value))}
                    />
                </div>
                <RangeSlider min={0} max={1000} step={10} value={[prices.priceFrom || 0, prices.priceTo || 1000]}
                    onValueChange={([priceFrom, priceTo]) => setPrice({ priceFrom, priceTo })}
                />
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
                selected={selectedIngredients}
            />
        </div>
    );
};
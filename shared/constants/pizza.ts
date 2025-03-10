export const mapPizzaSize = {
    20: 'Маленькая',
    30: 'Средняя',
    40: 'Большая',
} as const;

export const mapPizzaType = {
    1: 'Традиционная',
    2: 'Тонкая',
} as const;

export const pizzaSizes = Object.entries(mapPizzaSize).map(([value, name]) => ({
    name,
    value, // 20 30 40
}));
export const pizzaTypes = Object.entries(mapPizzaType).map(([value, name]) => ({
    name,
    value,
}))

export type PizzaSize = keyof typeof mapPizzaSize
export type PizzaType = keyof typeof mapPizzaType
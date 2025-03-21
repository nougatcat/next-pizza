import { prisma } from "@/prisma/prisma-client";

export interface GetSearchParams {
    query?: string;
    sortBy?: string;
    sizes?: string;
    pizzaTypes?: string;
    ingredients?: string
    priceFrom?: string;
    priceTo?: string;
}

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 1000;

export const findPizzas = async (params: GetSearchParams) => {
    const sizes = params.sizes?.split(',').map(Number)
    //нужно из url вытащить размеры, которые записаны в виде "sizes=1,2,3"
    //преобразовать это в массив чисел [1,2,3]. Аналогично для pizzaTypes и ingredients
    const pizzaTypes = params.pizzaTypes?.split(',').map(Number)
    const ingredientsIdArr = params.ingredients?.split(',').map(Number)

    const minPrice = Number(params.priceFrom) || DEFAULT_MIN_PRICE
    const maxPrice = Number(params.priceTo) || DEFAULT_MAX_PRICE

    const categories = await prisma.category.findMany({
        include: {
            products: {
                orderBy: {
                    id: 'desc'
                },
                where: {
                    // найди те id, которые есть внутри ingredientsIdArr
                    //это вернет те продукты, у которых есть выбранные слева ингредиенты
                    ingredients: ingredientsIdArr
                        ? {
                            some: {
                                id: {
                                    in: ingredientsIdArr
                                }
                            }
                        }
                        : undefined,

                        items: {
                            some: {
                                size: {
                                    in: sizes
                                },
                                pizzaType: {
                                    in: pizzaTypes
                                },
                                price: {
                                    gte: minPrice, // greater than or equal >=
                                    lte: maxPrice // less than or equal <=
                                }
                            }
                        }
                }, 
                include: {
                    ingredients: true,
                    items: { // сортировка вариаций товаров по цене от меньшего к большему
                        where: {
                            price: {
                                gte: minPrice, 
                                lte: maxPrice 
                            }
                        },
                        orderBy: {
                            price: 'asc' 
                        }
                    },
                }
            }
        }
    }) // позволяет получать данные так - categories[0].products[0].items

    return categories
}


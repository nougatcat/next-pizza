import { axiosInstance } from "./instance"
import { CartDTO, CreateCartItemValues } from "./dto/cart.dto"

export const getCart = async (): Promise<CartDTO> => {
    return (await axiosInstance.get<CartDTO>('/cart')).data
}

//отправляет запрос на обновление количества вещей в корзине
export const updateItemQuantity = async (itemId: number, quantity: number): Promise<CartDTO> => {
    return (await axiosInstance.patch<CartDTO>('/cart/' + itemId, { quantity })).data
}

//удаляет вещь из корзины
export const removeCartItem = async (id: number): Promise<CartDTO> => {
    // const {data} = await axiosInstance.delete<CartDTO>('/cart/' + id)
    // return data эти две строчки делают то же самое, что третья строчка
    return (await axiosInstance.delete<CartDTO>('/cart/' + id)).data
}

export const addCartItem = async (value: CreateCartItemValues): Promise<CartDTO> => {
    return (await axiosInstance.post<CartDTO>('/cart', value)).data
}
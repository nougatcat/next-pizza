import { axiosInstance } from "./instance"
import { CartDTO } from "./dto/cart.dto"

export const getCart = async (): Promise<CartDTO> => {
    return (await axiosInstance.get<CartDTO>('/cart')).data
}

//отправляет запрос на обновление количества вещей в корзине
export const updateItemQuantity = async (itemId: number, quantity: number): Promise<CartDTO> => {
    return (await axiosInstance.patch<CartDTO>('/cart/' + itemId, {quantity})).data
} 
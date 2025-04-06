//? схемы для zod
import {z} from 'zod'

export const passwordSchema = z.string().min(4, {message: 'Пароль должен содержать не менее 6 символов'})

export const formLoginSchema = z.object({
    email: z.string().email({message: 'Введите корректную почту'}),
    password: passwordSchema
})

/**
 * @param email
 * @param fullName
 * @param password
 * @param confirmPassword
 */
export const formRegisterSchema = formLoginSchema.merge(
    z.object({
        fullName: z.string().min(2, {message: 'Введите имя и фамилию'}),
        confirmPassword: passwordSchema // подтверждение пароля (второй ввод)
    })
).refine(data => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают', // если не совпало
    path: ['confirmPassword'] // с чем сравнивать
})


export type TFormLoginValues = z.infer<typeof formLoginSchema>
export type TFormRegisterValues = z.infer<typeof formRegisterSchema>


// refine - уточнить
// infer - вывести
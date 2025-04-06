import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { formLoginSchema, TFormLoginValues } from './schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Title } from '../../../title';
import { FormInput } from '../../../form';
import { Button } from '@/shared/components/ui';
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';

interface Props {
    onClose?: VoidFunction; // при успешной авторизации будет вызывать закрытие модала
}

export const LoginForm: React.FC<Props> = ({ onClose }) => {
    const form = useForm<TFormLoginValues>({
        resolver: zodResolver(formLoginSchema),
        defaultValues: {
            email: '',
            password: '',
        }
    })

    const onSubmit = async (data: TFormLoginValues) => {
        try {
            const resp = await signIn('credentials', {
                ...data,
                redirect: false, //если это не указать, то будет true, то есть будет редирект на главную страницу
            })
            if (!resp?.ok) {
                throw Error() // вызовет catch
            }
            toast.success('Вы успешно вошли в аккаунт', {
                icon: '✅'
            })
            onClose?.()
        } catch (error) {
            console.error('Error [LOGIN}',error)
            toast.error('Не удалось войти в аккаунт', {
                icon: '❌',
            })
        }
    }

    return (
        <FormProvider {...form}>
            <form className='flex flex-col gap-5' onSubmit={form.handleSubmit(onSubmit)}>

                <div className='flex justify-between items-center'> 
                    <div className='mr-2'>
                        <Title text="Вход в аккаунт" size="md" className='font-bold'    />
                        <p className='text-gray-400'>Введите свою почту, чтобы войти в аккаунт</p>
                    </div>
                    <img src="/assets/images/phone-icon.png" alt="phone-icon" width={60} height={60} />
                </div>

                <FormInput name="email" label="E-mail" required />
                <FormInput name="password" label="Пароль" type='password' required />

                <Button type="submit" loading={form.formState.isSubmitting} className='h-12 text-base' >
                    Войти
                </Button>
            </form>
        </FormProvider>
    );
};
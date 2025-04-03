'use client'
import { cn } from '@/shared/lib/utils';
import React from 'react';
import { Container } from './container';
import Image from 'next/image';
import Link from 'next/link';
import { SearchInput } from './search-input';
import { CartButton } from './cart-button';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { ProfileButton } from './profile-button';
import { AuthModal } from './modals';

interface Props {
    className?: string;
    hasSearch?: boolean;
    hasCart?: boolean;
}

export const Header: React.FC<Props> = ({ hasCart = true, hasSearch = true, className }) => {
    const [openAuthModal, setOpenAuthModal] = React.useState(false)
    // После оплаты покажет уведомление поверх хэдера
    const searchParams = useSearchParams()
    const router = useRouter()
    React.useEffect(() => {
        if (searchParams.has('paid')) {
            toast.success('Заказ успешно оплачен! Информация отправлена на почту.')
            router.push('/')
        }
    },[])

    return (
        <header className={cn('border-b', className)}>
            <Container className='flex items-center justify-between py-8'>
                {/* Левая часть*/}
                <Link href="/">
                    <div className='flex items-center gap-4'>
                        <Image src='/logo.png' width={32} height={32} alt='logo' />
                        <div>
                            <h1 className='text-2xl uppercase font-black'>Next Pizza</h1>
                            <p className='text-sm text-gray-400 leading-3'>вкусней уже некуда</p>
                        </div>
                    </div>
                </Link>

                {hasSearch && <div className='mx-10 flex-1'>
                    <SearchInput />
                </div>}

                {/* Правая часть */}
                <div className="flex items-center gap-3">
                    <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)} />
                    <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />
                    {hasCart && <CartButton />}
                </div>
            </Container>
        </header>
    );
}; 
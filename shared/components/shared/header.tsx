import { cn } from '@/shared/lib/utils';
import React from 'react';
import { Container } from './container';
import Image from 'next/image';
import { Button } from '../ui';
import { User } from 'lucide-react';
import Link from 'next/link';
import { SearchInput } from './search-input';
import { CartButton } from './cart-button';

interface Props {
    className?: string;
    hasSearch?: boolean;
    hasCart?: boolean;
}

export const Header: React.FC<Props> = ({ hasCart = true, hasSearch = true, className }) => {
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
                    <Button variant="outline" className='flex items-center gap-1'>
                        <User size={16} />
                        Войти
                    </Button>
                    {hasCart && <CartButton />}
                </div>
            </Container>
        </header>
    );
}; 
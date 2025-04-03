
import { Button } from '@/shared/components/ui';
import { Dialog, DialogContent } from '@/shared/components/ui/dialog';
import { signIn } from 'next-auth/react';
import React from 'react';

interface Props {
    open: boolean;
    onClose: () => void;
}

export const AuthModal: React.FC<Props> = ({ open, onClose }) => {
    const handleClose = () => {
        onClose()
    }
    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className='w-[450px] bg-white p-10'>
                форма регистрации
                <hr />
                {/* кнопки авторизации через гитхаб и через гугл */}
                <div className='flex gap-2'>
                    <Button
                        variant='secondary'
                        onClick={() =>
                            signIn('github', {
                                callbackUrl: '/',
                                redirect: true,
                            })
                        }
                        type='button'
                        className='gap-2 h-12 p-2 flex-1'
                    >
                        <img src="https://github.githubassets.com/favicons/favicon.svg" alt="github" className='w-6 h-6' />
                        Github
                    </Button>

                    <Button
                        variant='secondary'
                        onClick={() =>
                            signIn('google', {
                                callbackUrl: '/',
                                redirect: true,
                            })
                        }
                        type='button'
                        className='gap-2 h-12 p-2 flex-1'
                    >
                        <img src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg" alt="google (gmail)" className='w-6 h-6' />
                        Google/Gmail
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
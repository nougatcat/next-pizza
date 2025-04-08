'use client'
import { Api } from '@/shared/services/api-client';
import { IStory } from '@/shared/services/stories';
import React from 'react';
import { Container } from './container';
import { cn } from '@/shared/lib/utils';
import { X } from 'lucide-react';
import ReactStories from 'react-insta-stories'

interface Props {
    className?: string;
}

export const Stories: React.FC<Props> = ({ className }) => {
    // стейт хранения списка сторисов
    const [stories, setStories] = React.useState<IStory[]>([])
    // стейт для открытия сторисов
    const [open, setOpen] = React.useState(false)
    // стейт для выбранного сториса
    const [selectedStory, setSelectedStory] = React.useState<IStory>()

    // useEffect запрашивает сторисы
    React.useEffect(() => {
        async function fetchStories() {
            const data = await Api.stories.getAll()
            setStories(data)
        }
        fetchStories()
    }, [])


    const onClickStory = (story: IStory) => {
        setSelectedStory(story)

        if (story.items.length > 0) {
            setOpen(true)
        }
    }

    return <>
        <Container className={cn('flex items-center justify-between gap-2 my-10', className)}>
            {/* если сторисов нет, выводим скелетоны */}
            {stories.length === 0 &&
                [...Array(8)].map((_, index) => (
                    <div key={index} className='w-[160px] h-[200px] bg-gray-200 rounded-md animate-pulse' />
                ))
            }
            {stories.map((story) => (
                <img
                    key={story.id}
                    onClick={() => onClickStory(story)}
                    className='rounded-md cursor-pointer'
                    height={200}
                    width={160}
                    src={story.previewImageUrl}
                />
            ))}

            {/* когда кликнули на какую-то историю, делаем модальное окно с ней */}
            {
                // ! без z-30 будет мешаться поисковая строка при открытии сториса
                open &&
                <div className='fixed left-0 top-0 w-full h-full bg-black/80 flex items-center justify-center z-30 '>
                    <div className='fixed' style={{ width: 455 }}>
                        <button className='absolute -right-10 -top-5 z-30' onClick={() => setOpen(false)}>
                            <X className='absolute top-0 right-0 w-8 h-8 text-white/50' />
                        </button>
                        <ReactStories
                            onAllStoriesEnd={() => setOpen(false)}
                            stories={selectedStory?.items.map((item) => ({ url: item.sourceUrl })) || []}
                            defaultInterval={3000}
                            width={455}
                            height={700}
                        />
                    </div>
                </div>
                // ! только первые сторис имеют в бд story-items, поэтому кликаться будут только они, пока не добавишь еще элементы в бд
            }
        </Container>
    </>
};
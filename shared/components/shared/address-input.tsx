
'use client'
import { dadataToken } from '@/shared/constants/api-tokens'
import React from 'react'
import { AddressSuggestions } from 'react-dadata'
import 'react-dadata/dist/react-dadata.css'

interface Props {
    onChange?: (value?: string) => void
}

export const AddressInput: React.FC<Props> = ({ onChange }) => {
    return (
        <AddressSuggestions
            token= {dadataToken}
            onChange={(data) => onChange?.(data?.value)}
        />
    )
}
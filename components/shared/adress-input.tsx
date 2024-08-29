'use client'

import React from 'react'
import { AddressSuggestions } from 'react-dadata'
import 'react-dadata/dist/react-dadata.css'

interface Props {
	onChange?: (value?: string) => void
}

export const AdressInput: React.FC<Props> = ({ onChange }) => {
	return (
		<AddressSuggestions
			token='55a7a6346800599793768d13965cc911a452c08b'
			onChange={data => onChange?.(data?.value)}
		/>
	)
}

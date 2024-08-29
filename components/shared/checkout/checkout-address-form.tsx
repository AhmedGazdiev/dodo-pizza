'use client'

import { Textarea } from '@/components/ui'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { AdressInput } from '../adress-input'
import { ErrorText } from '../error-text'
import { WhiteBlock } from '../white-block'

interface Props {
	className?: string
}

export const CheckoutAddressForm: React.FC<Props> = ({ className }) => {
	const { control } = useFormContext()

	return (
		<WhiteBlock title='3. Адрес доставки' className={className}>
			<div className='flex flex-col gap-5'>
				<Controller
					control={control}
					name='adress'
					render={({ field, fieldState }) => (
						<>
							<AdressInput onChange={field.onChange} />
							{fieldState.error && (
								<ErrorText text={fieldState.error.message} />
							)}
						</>
					)}
				/>

				<Textarea
					placeholder='Комментарий к заказу'
					rows={5}
					className='text-base'
				/>
			</div>
		</WhiteBlock>
	)
}

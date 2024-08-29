'use client'

import { useFilters, useIngredients, useQueryFilters } from '@/hooks'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Input } from '../ui'
import { CheckboxFiltersGroup } from './checkbox-filters-group'
import { RangeSlider } from './range-slider'
import { Title } from './title'

interface Props {
	className?: string
}

interface PriceProps {
	priceFrom?: number
	priceTo?: number
}

interface QueryFilters extends PriceProps {
	pizzaTypes?: string
	sizes?: string
	ingredients?: string
}

export const Filters: React.FC<Props> = ({ className }) => {
	const router = useRouter()
	const filters = useFilters()
	const { ingredients, loading } = useIngredients()

	const items = ingredients.map(item => ({
		value: String(item.id),
		text: item.name,
	}))

	useQueryFilters(filters)

	const updatePrices = (prices: number[]) => {
		console.log(prices, 999)
		filters.setPrices('priceFrom', prices[0])
		filters.setPrices('priceTo', prices[1])
	}

	return (
		<div className={className}>
			<Title text='Фильтрация' size='sm' className='mb-5 font-bold' />
			<div className='flex flex-col gap-4 select-none'>
				<CheckboxFiltersGroup
					title='Тип теста'
					name='pizzaTypes'
					className='mb-5'
					onClickCheckbox={filters.setPizzaTypes}
					selected={filters.pizzaTypes}
					items={[
						{ text: 'Тонкое', value: '1' },
						{ text: 'Традиционное', value: '2' },
					]}
				/>

				<CheckboxFiltersGroup
					title='Размеры'
					name='sizes'
					className='mb-5'
					onClickCheckbox={filters.setSizes}
					selected={filters.sizes}
					items={[
						{ text: '20 см', value: '20' },
						{ text: '30 см', value: '30' },
						{ text: '40 см', value: '40' },
					]}
				/>
			</div>
			<div className='mt-5 border-y border-y-neutral-100 py-6 pb-7'>
				<p className='font-bold mb-3'>Цена от и до:</p>
				<div className='flex gap-3 mb-5'>
					<Input
						type='number'
						min={0}
						max={1000}
						placeholder='0'
						value={String(filters.prices.priceFrom)}
						// onChange={e => onUpdatePrice('priceFrom', Number(e.target.value))}
						onChange={e =>
							filters.setPrices('priceFrom', Number(e.target.value))
						}
					/>
					<Input
						type='number'
						min={100}
						max={1000}
						placeholder='1000'
						value={String(filters.prices.priceTo)}
						// onChange={e => onUpdatePrice('priceTo', Number(e.target.value))}
						onChange={e => filters.setPrices('priceTo', Number(e.target.value))}
					/>
				</div>

				<RangeSlider
					min={0}
					max={1000}
					step={10}
					value={[
						filters.prices.priceFrom || 0,
						filters.prices.priceTo || 1000,
					]}
					onValueChange={updatePrices}
				/>
			</div>
			<div className='select-none'>
				<CheckboxFiltersGroup
					title='Ингредиенты'
					name='ingredients'
					className='mt-5'
					limit={5}
					defaultItems={items.slice(0, 6)}
					items={items}
					loading={loading}
					onClickCheckbox={filters.setSelectedIngredients}
					selected={filters.selectedIngredients}
				/>
			</div>
		</div>
	)
}

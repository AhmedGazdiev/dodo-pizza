'use client'

import { ProductWithRelations } from '@/@types/prisma'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { useCartStore } from '@/store'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'
import { ChoosePizzaForm } from '../choose-pizza-form'
import { ChooseProductForm } from '../choose-product-form'

interface Props {
	product: ProductWithRelations
	className?: string
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
	const router = useRouter()
	const firstItem = product.items[0]
	const isPizzaForm = Boolean(product.items[0].pizzaType)

	const [addCartItem, loading] = useCartStore(state => [
		state.addCartItem,
		state.loading,
	])

	const onAddProduct = () => {
		try {
			addCartItem({
				productItemId: firstItem.id,
			})
			toast.success('Товар добавлен в корзину')
			router.back()
		} catch (error) {
			toast.error('Не удалось добавить товар в корзину')
			console.log(error)
		}
	}
	const onAddPizza = async (productItemId: number, ingredients: number[]) => {
		try {
			await addCartItem({
				productItemId,
				ingredients,
			})
			toast.success('Пицца добавлена в корзину')
			router.back()
		} catch (error) {
			toast.error('Не удалось добавить пиццу в корзину')
			console.log(error)
		}
	}

	return (
		<Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
			<DialogContent
				className={cn(
					'p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden',
					className
				)}
			>
				{isPizzaForm ? (
					<ChoosePizzaForm
						imageUrl={product.imageUrl}
						ingredients={product.ingredients}
						name={product.name}
						items={product.items}
						onSubmit={onAddPizza}
						loading={loading}
					/>
				) : (
					<ChooseProductForm
						imageUrl={product.imageUrl}
						name={product.name}
						price={firstItem.price}
						onSubmit={onAddProduct}
						loading={loading}
					/>
				)}
			</DialogContent>
		</Dialog>
	)
}

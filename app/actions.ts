'use server'

import { CheckoutFormValues } from '@/constants/checkout-form-schema'
import { prisma } from '@/prisma/prisma-client'
import { OrderStatus, Prisma } from '@prisma/client'
import { cookies } from 'next/headers'

export async function createOrder(data: CheckoutFormValues) {
	console.log(data)

	const cookieStore = cookies()
	const cartToken = cookieStore.get('cartToken')?.value

	if (!cartToken) {
		throw new Error('Cart token not found')
	}

	// const userCart = await prisma.cart.findFirst({
	// 	include: {
	// 		user: true,
	// 		items: {
	// 			include: {
	// 				ingredients: true,
	// 				productItem: {
	// 					include: {
	// 						product: true,
	// 					},
	// 				},
	// 			},
	// 		},
	// 	},
	// 	where: {
	// 		token: cartToken,
	// 	},
	// })

	// if (!userCart) {
	// 	throw new Error('Cart not found')
	// }

	// if (userCart?.totalAmount === 0) {
	// 	throw new Error('Cart is empty')
	// }

	await prisma.order.create({
		data: {
			token: cartToken,
			totalAmount: 1500,
			status: OrderStatus.PENDING,
			items: [],
			fullName: data.firstName + ' ' + data.lastName,
			email: data.email,
			phone: data.phone,
			address: data.address,
			comment: data.comment,
		},
	})
}

export async function updateUserInfo(body: Prisma.UserUpdateInput) {}

export async function registerUser(body: Prisma.UserCreateInput) {}

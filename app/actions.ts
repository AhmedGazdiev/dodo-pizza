import { CheckoutFormValues } from '@/constants/checkout-form-schema'
import { Prisma } from '@prisma/client'

export async function createOrder(data: CheckoutFormValues) {
	try {
	} catch (err) {
		console.log('[CreateOrder] Server error', err)
	}
}

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
	try {
	} catch (err) {
		console.log('Error [UPDATE_USER]', err)
		throw err
	}
}

export async function registerUser(body: Prisma.UserCreateInput) {
	try {
	} catch (err) {
		console.log('Error [CREATE_USER]', err)
		throw err
	}
}

import { Variant } from '@/components/shared/group-variants'
import { pizzaSizes, PizzaType } from '@/constants/pizza'
import { ProductItem } from '@prisma/client'

export const getAvailablePizzaSizes = (
	type: PizzaType,
	items: ProductItem[]
): Variant[] => {
	const filteredPizzaByType = items.filter(item => item.pizzaType === type)

	return pizzaSizes.map(item => ({
		name: item.name,
		value: item.value,
		disabled: !filteredPizzaByType.some(
			pizza => Number(pizza.size) === Number(item.value)
		),
	}))
}

import { Header } from '@/components/shared'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Dodo Pizza | Главная',
	description: 'Главная',
}

export default function HomeLayout({
	children,
	modal,
}: Readonly<{
	children: React.ReactNode
	modal: React.ReactNode
}>) {
	return (
		<main className='min-h-screen'>
			<Header />
			{children}
			{modal}
		</main>
	)
}

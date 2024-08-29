import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Dodo Pizza | Дашборд',
	description: 'Дашборд',
}

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en'>
			DASHBOARD HEADER
			<body>{children}</body>
		</html>
	)
}

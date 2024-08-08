import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { NextUIProvider } from '@nextui-org/react'
import { Toaster } from 'sonner'
import NavBar from '@/components/navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'DIAC 2.0',
	description: 'Rápido, sencillo y muy efectivo canal de comunicación.',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="es">
			<body className={inter.className}>
				<NextUIProvider>
					<NavBar />
					{children}
				</NextUIProvider>
				<Toaster position="top-center" />
			</body>
		</html>
	)
}

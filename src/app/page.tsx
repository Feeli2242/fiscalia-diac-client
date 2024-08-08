'use client'

import Login from '@/components/forms/login'
import { userStore } from '@/store/user.store'
import { Button } from '@nextui-org/react'
import Link from 'next/link'

export default function Home() {
	const { user, login } = userStore()

	if (!user)
		return (
			<main className="flex min-h-screen flex-col items-center justify-start p-24">
				<h2 className="text-2xl font-semibold text-blue-900">
					Bienvenido al portal DIAC 2.0
				</h2>
				<p className="italic text-blue-950">
					Ingresa con tus credenciales para crear tickets de consultas
				</p>
				<div className="rounded-xl bg-white p-10 mt-9 shadow-xl">
					<Login />
				</div>
				<div className="flex justify-between w-1/4 mt-6">
					<Link href={'https://web.fiscaliadelconsumidor.cl'}>
						<Button color="warning" variant="ghost" size="sm">
							Volver a la web
						</Button>
					</Link>
					<Link href={'/register'}>
						<Button color="primary" variant="ghost" size="sm">
							Crear cuenta
						</Button>
					</Link>
				</div>
			</main>
		)

	return <></>
}

import Register from '@/components/forms/register'
import { Button } from '@nextui-org/react'
import Link from 'next/link'

export default function RegisterPage() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-start p-24">
			<h2 className="text-2xl font-semibold text-blue-900">
				Crea tu cuenta en el portal DIAC 2.0
			</h2>
			<p className="italic text-blue-950">
				En pocos pasos, recibirás un email con tus datos ingresados
			</p>
			<div className="rounded-xl bg-white p-10 mt-9 shadow-xl">
				<Register />
			</div>
			<div className="flex justify-between w-1/4 mt-6">
				<Link href={'https://web.fiscaliadelconsumidor.cl'}>
					<Button color="warning" variant="ghost" size="sm">
						Volver a la web
					</Button>
				</Link>
				<Link href={'/'}>
					<Button color="primary" variant="ghost" size="sm">
						Ir al login
					</Button>
				</Link>
			</div>
		</main>
	)
}

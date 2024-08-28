'use client'
import { url_back } from '@/constants/envs'
import { Ticket } from '@/interfaces/ticket'
import { User } from '@/interfaces/user'
import { ticketStore } from '@/store/tickets.store'
import { Button, Input, Textarea } from '@nextui-org/react'
import { FormEvent, useState } from 'react'
import { toast } from 'sonner'

type NewTicket = Omit<Ticket, 'id'>
export default function CreateTicket({ user }: { user: User }) {
	const { newTicket } = ticketStore()
	const [loading, setLoading] = useState(false)
	const initialForm: NewTicket = {
		creatorId: user.id,
		title: '',
		description: '',
		status: 'pendiente',
	}

	const [form, setForm] = useState<NewTicket>(initialForm)

	const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		try {
			setLoading(true)
			const res = await fetch(`${url_back}/ticket`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(form),
			})
			if (!res.ok) throw new Error('Falló fetch')
			const data: Ticket = await res.json()
			newTicket(data)
			toast.success('Ticket creado exitosamente!')
		} catch (error) {
			console.log(error)
			toast.error('No se pudo crear el ticket')
		} finally {
			setLoading(false)
			setForm(initialForm)
		}
	}
	return (
		<form className="py-6 space-y-2" onSubmit={handleSubmitForm}>
			<Input
				label="Asunto"
				color="primary"
				value={form.title}
				onChange={(e) => setForm({ ...form, title: e.target.value })}
			/>
			<Textarea
				label="Detalle del ticket"
				color="primary"
				value={form.description}
				onChange={(e) =>
					setForm({ ...form, description: e.target.value })
				}
			/>
			<Button
				variant="shadow"
				color="warning"
				type="submit"
				isLoading={loading}
				isDisabled={loading}
			>
				Crear ticket
			</Button>
		</form>
	)
}

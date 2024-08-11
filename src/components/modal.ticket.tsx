import { url_back } from '@/constants/envs'
import { Status } from '@/constants/ticket.status'
import { Ticket } from '@/interfaces/ticket'
import { ticketStore } from '@/store/tickets.store'
import { userStore } from '@/store/user.store'
import {
	Button,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Select,
	SelectItem,
	SharedSelection,
} from '@nextui-org/react'
import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function EditTicketTable({
	ticket,
	isOpen,
	setOpen,
}: {
	ticket: Ticket
	isOpen: boolean
	setOpen: Dispatch<SetStateAction<boolean>>
}) {
	const [loading, setLoading] = useState(false)
	const [form, setForm] = useState({
		ticketId: ticket.id,
		title: ticket.title,
		description: ticket.description,
		status: ticket.status,
	})
	const { updateTicket, deleteTicket } = ticketStore()
	const handleUpdateTicket = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		try {
			setLoading(true)
			const res = await fetch(`${url_back}/ticket`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(form),
			})
			const data: Ticket = await res.json()
			if (res.ok) {
				toast.success('Actualizado exitosamente')
				updateTicket(data)
				setOpen(false)
			}
		} catch (error) {
			console.log(error)
		} finally {
			setLoading(false)
		}
	}

	const handleSelectChange = (key: SharedSelection) => {
		const [status] = Array.from(key) as string[]
		setForm({ ...form, status })
	}

	const handleDeleteTicket = async (id: number) => {
		try {
			setLoading(true)
			await deleteTicket(id)
		} catch (error) {
			console.log(error)
		} finally {
			setLoading(false)
			setOpen(false)
		}
	}
	return (
		<Modal isOpen={isOpen} onClose={() => setOpen(false)}>
			<ModalContent>
				<ModalHeader>
					<h3 className="font-bold text-xl text-blue-900">
						Editar Ticket
					</h3>
				</ModalHeader>
				<ModalBody>
					<form
						onSubmit={handleUpdateTicket}
						className="space-y-2 mb-3"
					>
						<Select
							onSelectionChange={handleSelectChange}
							defaultSelectedKeys={[ticket.status]}
						>
							<SelectItem key={Status.Proceso}>
								{Status.Proceso}
							</SelectItem>
							<SelectItem key={Status.Pending}>
								{Status.Pending}
							</SelectItem>
							<SelectItem key={Status.Cerrado}>
								{Status.Cerrado}
							</SelectItem>
						</Select>
						<Input
							label="Asunto"
							value={form.title}
							onChange={(e) =>
								setForm({ ...form, title: e.target.value })
							}
						/>
						<Input
							label="Detalle"
							value={form.description}
							onChange={(e) =>
								setForm({
									...form,
									description: e.target.value,
								})
							}
						/>
						<div className="flex justify-between">
							<Button
								color="danger"
								type="button"
								onClick={() => handleDeleteTicket(ticket.id)}
								isDisabled={loading}
								isLoading={loading}
							>
								Eliminar
							</Button>
							<Button
								color="primary"
								type="submit"
								isDisabled={loading}
								isLoading={loading}
							>
								Actualizar
							</Button>
						</div>
					</form>
				</ModalBody>
			</ModalContent>
		</Modal>
	)
}

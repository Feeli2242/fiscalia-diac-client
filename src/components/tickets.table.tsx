'use client'
import { Ticket } from '@/interfaces/ticket'
import {
	Selection,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from '@nextui-org/react'
import { useState } from 'react'
import EditTicketTable from './modal.ticket'
import { ticketStore } from '@/store/tickets.store'

export default function TicketTable() {
	const [isOpen, setOpen] = useState(false)
	const { tickets } = ticketStore()
	const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)

	const handleTableSelection = (id: number) => {
		if (id) {
			const findTicket = tickets.find((t) => t.id === id)
			setOpen(() => true)
			setSelectedTicket(() => findTicket ?? null)
		} else {
			setSelectedTicket(() => null)
		}
	}
	if (!tickets) return null
	return (
		<>
			<Table>
				<TableHeader>
					<TableColumn>Título</TableColumn>
					<TableColumn>Descripción</TableColumn>
					<TableColumn>Estado</TableColumn>
				</TableHeader>
				<TableBody
					emptyContent={<div>No hay tickets de consulta</div>}
					items={tickets ?? []}
				>
					{(ticket) => (
						<TableRow
							key={ticket.id}
							onClick={() => handleTableSelection(ticket.id)}
							className="hover:bg-slate-200 cursor-pointer transition-all"
						>
							<TableCell>{ticket.title}</TableCell>
							<TableCell>{ticket.description}</TableCell>
							<TableCell>{ticket.status}</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
			{selectedTicket && (
				<EditTicketTable
					isOpen={isOpen}
					setOpen={setOpen}
					ticket={selectedTicket}
				/>
			)}
		</>
	)
}

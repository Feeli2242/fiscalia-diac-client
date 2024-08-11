import { url_back } from '@/constants/envs'
import { Ticket } from '@/interfaces/ticket'
import { toast } from 'sonner'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface TicketStore {
	tickets: Ticket[]
	setTickets: (tickets: Ticket[]) => void
	isLoadingStore: boolean
	setLoading: (value: boolean) => void
	updateTicket: (ticket: Ticket) => void
	deleteTicket: (ticket: number) => Promise<void>
}
export const ticketStore = create(
	persist<TicketStore>(
		(set, get) => ({
			tickets: [],
			isLoadingStore: true,
			setTickets: (tickets) => set({ tickets }),
			setLoading: (value: boolean) => set({ isLoadingStore: value }),
			updateTicket: (ticket) => {
				const { tickets } = get()
				const updateTickets = tickets.map((t) =>
					t.id === ticket.id ? ticket : t
				)
				set({ tickets: updateTickets })
			},
			deleteTicket: async (id) => {
				const res = await fetch(`${url_back}/ticket/${id}`, {
					method: 'DELETE',
				})
				if (res.ok) {
					const filterTickets = get().tickets.filter(
						(ticket) => ticket.id !== id
					)
					set({ tickets: filterTickets })
					toast.success('Se ha borrado exitosamente')
				} else {
					toast.error('No se pudo eliminar')
				}
			},
		}),
		{
			name: 'ticket-storage',
			onRehydrateStorage: () => (state) =>
				state && state.setLoading(false),
		}
	)
)

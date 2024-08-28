import { url_back } from '@/constants/envs'
import { Ticket } from '@/interfaces/ticket'
import { toast } from 'sonner'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { userStore } from './user.store'

interface TicketStore {
	tickets: Ticket[]
	setTickets: (tickets: Ticket[]) => void
	newTicket: (ticket: Ticket) => void
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
			newTicket: (ticket) => {
				const { tickets, setTickets } = get()
				const newTickets = [...tickets, { ...ticket }]
				setTickets(newTickets)
			},
			setTickets: (tickets) => {
				const { user, setUser } = userStore.getState()
				if (user) setUser({ ...user, tickets: tickets })
				set({ tickets })
			},
			setLoading: (value: boolean) => set({ isLoadingStore: value }),
			updateTicket: (ticket) => {
				const { tickets } = get()
				const updateTickets = tickets.map((t) =>
					t.id === ticket.id ? ticket : t
				)
				const { user, setUser } = userStore.getState()
				if (user) setUser({ ...user, tickets: updateTickets })
				set({ tickets: updateTickets })
			},
			deleteTicket: async (id) => {
				const { user, setUser } = userStore.getState()
				const res = await fetch(`${url_back}/ticket/${id}`, {
					method: 'DELETE',
				})
				if (res.ok) {
					const filterTickets = get().tickets.filter(
						(ticket) => ticket.id !== id
					)

					if (user) setUser({ ...user, tickets: filterTickets })
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

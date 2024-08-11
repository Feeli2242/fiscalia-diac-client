import { url_back } from '@/constants/envs'
import { User } from '@/interfaces/user'
import { toast } from 'sonner'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { ticketStore } from './tickets.store'

interface UserStore {
	user: User | null
	setUser: (user: User) => void
	token: string
	isLoadingStore: boolean
	login: (email: string, password: string) => Promise<void>
	logout: () => void
	setLoading: (value: boolean) => void
}
export const userStore = create(
	persist<UserStore>(
		(set, get) => ({
			user: null,
			token: '',
			isLoadingStore: true,
			setUser: (user) => set({ user }),
			login: async (email, password) => {
				try {
					const res = await fetch(`${url_back}/auth/login`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({ email, password }),
					})
					type Errors = {
						error: {
							message: string
						}
					}
					const data: User | Errors = await res.json()
					if (res.ok) {
						const user = data as User
						const token = res.headers.get('auth')
						toast.success('Ingreso correcto')
						set({
							user,
							token: token ?? '',
						})
						if (user.tickets) {
							ticketStore.getState().setTickets(user.tickets)
						}
					} else {
						const issue = data as Errors
						toast.error(issue.error.message)
					}
				} catch (error) {
					console.log(error)
					toast.error('Error de conexión con backend')
				}
			},
			logout: () => {
				set({ user: null, token: '' })
				ticketStore.getState().setTickets([])
			},
			setLoading: (value: boolean) => set({ isLoadingStore: value }),
		}),
		{
			name: 'user-storage',
			onRehydrateStorage: () => (state) =>
				state && state.setLoading(false),
		}
	)
)

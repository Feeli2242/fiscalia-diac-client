import { url_back } from '@/constants/envs'
import { User } from '@/interfaces/user'
import { toast } from 'sonner'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UserStore {
	user: User | null
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
			login: async (email, password) => {
				try {
					const res = await fetch(`${url_back}/auth/login`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({ email, password }),
					})
					const data = await res.json()
					if (res.ok) {
						const token = res.headers.get('auth')
						toast.success('Ingreso correcto')
						set({
							user: data,
							token: token ?? '',
						})
					} else {
						console.log(data.error)
						toast.error(data.error.message)
					}
				} catch (error) {
					console.log(error)
				}
			},
			logout: () => set({ user: null, token: '' }),
			setLoading: (value: boolean) => set({ isLoadingStore: value }),
		}),
		{
			name: 'user-storage',
			onRehydrateStorage: () => (state) =>
				state && state.setLoading(false),
		}
	)
)

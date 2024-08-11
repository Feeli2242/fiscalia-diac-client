'use client'
import { url_back } from '@/constants/envs'
import { userStore } from '@/store/user.store'
import { Button } from '@nextui-org/react'
import { useEffect, useState } from 'react'

export default function NavBar() {
	const { user, logout, token, isLoadingStore } = userStore()
	const [isValidToken, setValidToken] = useState(false)

	const checkToken = async (token: string) => {
		const res = await fetch(`${url_back}/auth/verify`, {
			headers: {
				auth: token,
			},
		})
		if (res.ok) {
			setValidToken(true)
		} else {
			logout()
		}
	}
	useEffect(() => {
		if (!isLoadingStore) {
			checkToken(token)
		}
	}, [isLoadingStore])
	if (!user) return null
	return (
		<nav className="bg-white rounded-b-md shadow-lg py-6">
			<div className="flex flex-row justify-between gap-3 px-3">
				<div className="flex gap-3">
					<Button size="sm" color="primary" variant="ghost">
						Inicio
					</Button>
					<Button size="sm" color="primary" variant="ghost">
						Usuarios
					</Button>
					<Button size="sm" color="primary" variant="ghost">
						Consultas
					</Button>
					<Button size="sm" color="primary" variant="ghost">
						Gestión
					</Button>
				</div>
				<div>
					<Button size="sm" color="warning" onClick={() => logout()}>
						Cerrar sesión
					</Button>
				</div>
			</div>
		</nav>
	)
}

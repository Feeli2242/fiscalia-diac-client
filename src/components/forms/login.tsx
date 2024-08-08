'use client'

import { userStore } from '@/store/user.store'
import { Button, Input } from '@nextui-org/react'
import { ChangeEvent, FormEvent, useState } from 'react'
import { toast } from 'sonner'

export default function Login() {
	const [loading, setLoading] = useState(false)
	const { login } = userStore()
	const [form, setForm] = useState({
		email: '',
		password: '',
	})

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value })
	}

	const onSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		try {
			setLoading(true)
			if (!form.email || !form.password) {
				toast.error('Faltan campos por completar')
			} else {
				await login(form.email, form.password)
			}
		} catch (error) {
			console.log(error)
		} finally {
			setLoading(false)
		}
	}
	return (
		<form onSubmit={onSubmitForm} className="space-y-2">
			<Input
				label="Dirección de correo"
				name="email"
				type="email"
				color="primary"
				value={form.email}
				onChange={handleInputChange}
			/>
			<Input
				label="Contraseña"
				name="password"
				type="password"
				color="primary"
				value={form.password}
				onChange={handleInputChange}
			/>
			<Button
				fullWidth
				color="primary"
				isDisabled={loading}
				isLoading={loading}
				type="submit"
			>
				Acceder
			</Button>
		</form>
	)
}

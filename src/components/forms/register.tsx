'use client'
import { url_back } from '@/constants/envs'
import { Role } from '@/interfaces/user'
import {
	Button,
	Input,
	Select,
	SelectItem,
	SharedSelection,
} from '@nextui-org/react'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { PiEye, PiEyeSlashFill } from 'react-icons/pi'
import { toast } from 'sonner'

type RoleString = 'Agente' | 'Administrador' | 'Usuario'

interface Form {
	email: string
	password: string
	name: string
	roleId: number
}
export default function Register() {
	const [loadingRoles, setLoadingRoles] = useState(false)
	const [loading, setLoading] = useState(false)
	const [isVisible, setVisible] = useState(false)
	const [roles, setRoles] = useState<Role[]>([])
	const [form, setForm] = useState<Form>({
		email: '',
		password: '',
		name: '',
		roleId: 1,
	})

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value })
	}

	const onSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		try {
			setLoading(true)
			if (!form.email || !form.password || !form.name) {
				toast.error('Faltan campos por completar')
			} else {
				const res = await fetch(`${url_back}/auth/register`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(form),
				})
				const data = await res.json()
				console.log(data)
				if (res.ok) {
					toast.success(
						'Registrado exitosamente, verifique su correo y acceda a Login'
					)
				}
			}
		} catch (error) {
			console.log(error)
		} finally {
			setLoading(false)
		}
	}

	const handleRoleChange = (e: SharedSelection) => {
		setForm({ ...form, roleId: Number(e.currentKey) })
	}

	useEffect(() => {
		const getRoles = async () => {
			try {
				setLoadingRoles(true)
				const res = await fetch(`${url_back}/role`)
				if (res.ok) {
					const data: Role[] = await res.json()
					setRoles(data)
				}
			} catch (error) {
				console.log(error)
			} finally {
				setLoadingRoles(false)
			}
		}
		getRoles()
	}, [])

	return (
		<form onSubmit={onSubmitForm} className="space-y-2">
			<p className="italic max-w-xs text-center text-pretty">
				El selector de tipo quedará por defecto (oculto) en "Agente"
				para todos los usuarios
			</p>
			<Select
				label="Tipo de usuario"
				color="warning"
				onSelectionChange={handleRoleChange}
				isDisabled={loadingRoles}
				isLoading={loadingRoles}
				isRequired
			>
				{roles.map((rol) => (
					<SelectItem key={rol.id}>{rol.name}</SelectItem>
				))}
			</Select>
			<Input
				label="Nombre y apellido"
				name="name"
				color="primary"
				value={form.name}
				onChange={handleInputChange}
			/>
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
				color="primary"
				minLength={4}
				value={form.password}
				onChange={handleInputChange}
				endContent={
					<button
						className="focus:outline-none"
						type="button"
						onClick={() => setVisible(!isVisible)}
						aria-label="toggle password visibility"
					>
						{isVisible ? (
							<PiEyeSlashFill className="text-2xl text-default-400 pointer-events-none" />
						) : (
							<PiEye className="text-2xl text-default-400 pointer-events-none" />
						)}
					</button>
				}
				type={isVisible ? 'text' : 'password'}
			/>
			<Button
				fullWidth
				color="primary"
				isDisabled={loading}
				isLoading={loading}
				type="submit"
			>
				Registrarse
			</Button>
		</form>
	)
}

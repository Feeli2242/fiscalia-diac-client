'use client'

import { userStore } from '@/store/user.store'
import TicketTable from './tickets.table'
import CreateTicket from './forms/create-ticket'

export default function Dashboard() {
	const { user } = userStore()

	if (!user) return null

	return (
		<>
			{user.tickets && (
				<div className="max-w-lg mx-auto mt-6 px-3">
					<h3 className="font-semibold text-xl text-center text-blue-900 py-2">
						Mis tickets creados
					</h3>
					<TicketTable />
					<CreateTicket user={user} />
				</div>
			)}
		</>
	)
}

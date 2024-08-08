import { Attachment } from './extras'
import { Ticket, TicketAssignment, TicketStatusHistory } from './ticket'

export interface Role {
	id: number
	name: string
	users?: User[]
}

export interface User {
	id: number
	email: string
	password: string
	name: string
	roleId: number
	createdAt?: Date
	updatedAt?: Date
	role?: Role
	tickets?: Ticket[]
	comments?: Comment[]
	assignedTickets?: TicketAssignment[]
	history?: TicketStatusHistory[]
	notifications?: Notification[]
	attachments?: Attachment[]
}

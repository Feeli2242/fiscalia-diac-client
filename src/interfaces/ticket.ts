import { Attachment } from './extras'
import { User } from './user'
export type Status = 'pendiente' | 'en_proceso' | 'cerrado'
export interface Ticket {
	id: number
	title: string
	description: string
	status: Status
	creatorId: number | null
	createdAt?: Date
	updatedAt?: Date
	creator?: User
	comments?: Comment[]
	assignments?: TicketAssignment[]
	history?: TicketStatusHistory[]
	attachments?: Attachment[]
}

export interface TicketAssignment {
	userId: number
	ticketId: number
	user?: User
	ticket?: Ticket
}

export interface TicketStatusHistory {
	id: number
	status: Status
	ticketId: number
	changedBy: number
	createdAt?: Date
	ticket?: Ticket
	user?: User
}

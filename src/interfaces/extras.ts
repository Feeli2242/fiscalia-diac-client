import { Ticket } from './ticket'
import { User } from './user'

export interface Comment {
	id: number
	content: string
	ticketId: number
	authorId: number
	createdAt?: Date
	updatedAt?: Date
	ticket?: Ticket
	author?: User
}

export interface Attachment {
	id: number
	url: string
	ticketId: number
	uploadedBy: number
	createdAt?: Date
	ticket?: Ticket
	user?: User
}

export interface Notification {
	id: number
	message: string
	userId: number
	seen?: boolean
	createdAt?: Date
	user?: User
}

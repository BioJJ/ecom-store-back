import { ObjectId } from 'mongodb'
export interface UserPayload {
	sub: number | ObjectId
	email: string
	name: string
	role?: UserRole
	iat?: number
	exp?: number
}

export enum UserRole {
	USER = 'user',
	ADMIN = 'admin'
}

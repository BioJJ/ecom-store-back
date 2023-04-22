import { ObjectId } from 'mongodb'

export interface UserToken {
	access_token: string
	sub: number | ObjectId
	email: string
	name: string
	role?: UserRole
}

export enum UserRole {
	USER = 'user',
	ADMIN = 'admin'
}

import { ObjectId } from 'mongodb'

export class UserFromJwt {
	id: number | ObjectId
	email: string
	name: string
}

import { Injectable } from '@nestjs/common'
import { UsersService } from 'src/users/users.service'
import { compareSync } from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { UserToken } from './models/UserToken'
import { UserPayload } from './models/UserPayload'
import { User } from 'src/users/entities/user.entity'

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UsersService,
		private readonly jwtService: JwtService
	) {}

	async login(user: User): Promise<UserToken> {
		const payload: UserPayload = {
			sub: user._id,
			email: user.email,
			name: user.name,
			role: user.role
		}

		return {
			access_token: this.jwtService.sign(payload),
			sub: user._id,
			email: user.email,
			name: user.name,
			role: user.role
		}
	}

	async validateUser(email: string, password: string) {
		let user: User
		try {
			user = await this.userService.findEmail(email)
		} catch (error) {
			return null
		}

		const isPasswordValid = compareSync(password, user.password)
		if (!isPasswordValid) return null

		return user
	}
}

import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, Matches } from 'class-validator'
import { MessagesHelper } from 'src/helpers/messages.helper'
import { RegExHelper } from 'src/helpers/regex.helper'

export enum UserRole {
	USER = 'user',
	ADMIN = 'admin'
}

export class CreateUserDto {
	@ApiProperty()
	@IsNotEmpty()
	name: string

	@ApiProperty()
	@IsNotEmpty()
	@IsEmail()
	email: string

	@ApiProperty()
	@Matches(RegExHelper.password, { message: MessagesHelper.PASSWORD_VALID })
	password: string

	@ApiProperty()
	status: boolean

	@ApiProperty()
	profile: UserRole
}

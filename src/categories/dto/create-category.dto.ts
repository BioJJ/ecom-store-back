import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class CreateCategoryDto {
	@ApiProperty()
	@IsNotEmpty()
	name: string

	@ApiProperty()
	image: string

	@ApiProperty()
	@IsNotEmpty()
	status: boolean
}

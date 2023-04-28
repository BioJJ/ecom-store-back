import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { Category } from 'src/categories/entities/category.entity'

export class CreateProductDto {
	@ApiProperty()
	@IsNotEmpty()
	name: string

	@ApiProperty()
	@IsNotEmpty()
	price: number

	@ApiProperty()
	image: string

	@ApiProperty()
	@IsNotEmpty()
	status: boolean

	@ApiProperty()
	@IsNotEmpty()
	category: Category
}

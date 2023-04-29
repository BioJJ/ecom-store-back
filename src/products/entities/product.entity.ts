import { ApiProperty } from '@nestjs/swagger'
import { ObjectId } from 'mongodb'
import { Category } from 'src/categories/entities/category.entity'
import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	ManyToOne,
	ObjectIdColumn,
	UpdateDateColumn
} from 'typeorm'

@Entity()
export class Product {
	@ObjectIdColumn()
	@ApiProperty()
	_id: ObjectId

	@Column()
	@ApiProperty()
	name: string

	@Column()
	@ApiProperty()
	price: number

	@Column()
	@ApiProperty()
	image: string

	@Column({ default: true })
	@ApiProperty()
	status: boolean

	@ManyToOne(() => Category, (category) => category.product)
	@Column()
	category: Category

	@CreateDateColumn({
		type: 'timestamp',
		name: 'create_at',
		default: () => 'CURRENT_TIMESTAMP(6)'
	})
	@ApiProperty()
	createAt: Date

	@UpdateDateColumn({
		type: 'timestamp',
		name: 'update_at',
		default: () => 'CURRENT_TIMESTAMP(6)',
		onUpdate: 'CURRENT_TIMESTAMP(6)'
	})
	@ApiProperty()
	updateAt: Date

	@DeleteDateColumn({
		type: 'timestamp',
		name: 'deleted_at',
		default: () => 'CURRENT_TIMESTAMP(6)'
	})
	@ApiProperty()
	deletedAt: Date
}

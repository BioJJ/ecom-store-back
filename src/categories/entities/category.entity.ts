import { ApiProperty } from '@nestjs/swagger'
import { ObjectId } from 'mongodb'
import { Product } from 'src/products/entities/product.entity'
import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	ObjectIdColumn,
	OneToMany,
	UpdateDateColumn
} from 'typeorm'

@Entity()
export class Category {
	@ObjectIdColumn()
	@ApiProperty()
	_id: ObjectId

	@Column()
	@ApiProperty()
	name: string

	@Column()
	@ApiProperty()
	image: string

	@OneToMany(() => Product, (product) => product.category)
	product: Product[]

	@ApiProperty()
	@Column({ default: true })
	status: boolean

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

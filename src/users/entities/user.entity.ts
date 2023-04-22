import { ApiProperty } from '@nestjs/swagger'
import { ObjectId } from 'mongodb'
import {
	BeforeInsert,
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	ObjectIdColumn,
	UpdateDateColumn
} from 'typeorm'
import { hashSync } from 'bcrypt'

export enum UserRole {
	USER = 'user',
	ADMIN = 'admin'
}

@Entity()
export class User {
	@ObjectIdColumn()
	@ApiProperty()
	_id: ObjectId

	@Column()
	@ApiProperty()
	name: string

	@Column()
	@ApiProperty()
	email: string

	@Column({ nullable: false })
	@ApiProperty()
	password: string

	@Column({ type: 'varchar', default: UserRole.USER, name: 'userRole' })
	@ApiProperty()
	role: UserRole

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

	@BeforeInsert()
	hashPassword() {
		this.password = hashSync(this.password, 10)
	}
}

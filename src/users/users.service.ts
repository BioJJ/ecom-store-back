import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { FindOneOptions, Repository } from 'typeorm'
import * as mongodb from 'mongodb'

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User) private userRepository: Repository<User>
	) {}

	async create(createUserDto: CreateUserDto): Promise<User> {
		const user = this.userRepository.create(createUserDto)
		return await this.userRepository.save(user)
	}

	async update(userId: any, updateUserDto: UpdateUserDto): Promise<void> {
		const userDTO = await this.findOne(userId)
		const user = this.userRepository.create(userDTO)
		this.userRepository.merge(user, updateUserDto)
		await this.userRepository.save(user)
	}

	async findAll(): Promise<User[]> {
		return await this.userRepository.find({
			select: ['_id', 'name', 'email', 'role', 'status'],
			where: { status: true }
		})
	}

	async findOne(id: number): Promise<User> {
		const user = await this.userRepository.findOneOrFail({
			select: ['_id', 'name', 'email', 'role', 'status'],
			where: { _id: new mongodb.ObjectId(id) }
		})

		if (!id) {
			throw new NotFoundException(`Não achei um usuario com o id ${id}`)
		}
		return user
	}

	async remove(id: number): Promise<void> {
		await this.findOne(+id)

		if (!id) {
			throw new NotFoundException(`Não achei um Usuario com o id ${id}`)
		}
		this.userRepository.softDelete({ _id: new mongodb.ObjectId(id) })
	}

	async activate(id: number): Promise<void> {
		await this.userRepository.update(id, { status: true })
	}

	async inactivate(id: number): Promise<void> {
		await this.userRepository.update(id, { status: false })
	}
}

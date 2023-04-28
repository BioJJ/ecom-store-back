import { HttpException, Injectable, NotFoundException } from '@nestjs/common'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { MongoRepository } from 'typeorm'
import { AwsS3Service } from 'src/aws-s3/aws-s3.service'
import * as mongodb from 'mongodb'
import { InjectRepository } from '@nestjs/typeorm'
import { Category } from './entities/category.entity'

@Injectable()
export class CategoriesService {
	constructor(
		@InjectRepository(Category)
		private readonly categoryRepository: MongoRepository<Category>,
		private awsS3Service: AwsS3Service
	) {}
	async create(
		createCategoryDto: CreateCategoryDto,
		file: Express.Multer.File
	): Promise<Category> {
		createCategoryDto.image = await this.addFile(file)
		const category = this.categoryRepository.create(createCategoryDto)
		return await this.categoryRepository.save(category)
	}

	async update(
		id: mongodb.ObjectId,
		updateCategoryDto: UpdateCategoryDto,
		file: Express.Multer.File
	): Promise<void> {
		const category = await this.findOne(id)

		if (file != null) {
			updateCategoryDto.image = await this.addFile(file)
		}

		this.categoryRepository.merge(category, updateCategoryDto)
		await this.categoryRepository.save(category)
	}

	async findAll(): Promise<Category[]> {
		return await this.categoryRepository.find({
			select: ['_id', 'name', 'image', 'status']
		})
	}

	async findOne(id: any): Promise<Category> {
		console.log('findOne id', id)
		const product = await this.categoryRepository.findOneOrFail({
			select: ['_id', 'name', 'status', 'image'],
			where: { _id: new mongodb.ObjectId(id) }
		})

		if (!id) {
			throw new NotFoundException(`Não achei uma Category com o id ${id}`)
		}
		return product
	}

	async remove(id: mongodb.ObjectId): Promise<void> {
		await this.findOne(id)

		if (!id) {
			throw new NotFoundException(`Não achei uma Category com o id ${id}`)
		}
		this.categoryRepository.softDelete({ _id: new mongodb.ObjectId(id) })
	}

	async addFile(file: Express.Multer.File): Promise<string> {
		if (file === null) {
			throw new HttpException('invalid image!', 400)
		}
		const bucketKey = `${file.fieldname}${Date.now()}`
		const fileUrl = await this.awsS3Service.uploadFile(file, bucketKey)

		return fileUrl
	}
}

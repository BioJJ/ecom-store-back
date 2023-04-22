import { HttpException, Injectable, NotFoundException } from '@nestjs/common'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Product } from './entities/product.entity'
import { MongoRepository } from 'typeorm'
import { AwsS3Service } from 'src/aws-s3/aws-s3.service'
import * as mongodb from 'mongodb'
@Injectable()
export class ProductsService {
	constructor(
		@InjectRepository(Product)
		private readonly productRepository: MongoRepository<Product>,
		private awsS3Service: AwsS3Service
	) {}

	async create(
		createProductDto: CreateProductDto,
		file: Express.Multer.File
	): Promise<Product> {
		createProductDto.image = await this.addFile(file)
		const product = this.productRepository.create(createProductDto)
		return await this.productRepository.save(product)
	}

	async update(
		id: string,
		updateProductDto: UpdateProductDto,
		file: Express.Multer.File
	): Promise<void> {
		const product = await this.findOne(+id)

		if (file != null) {
			updateProductDto.image = await this.addFile(file)
		}

		this.productRepository.merge(product, updateProductDto)
		await this.productRepository.save(product)
	}

	async findAll(): Promise<Product[]> {
		return await this.productRepository.find({
			select: ['_id', 'name', 'price', 'status', 'image']
		})
	}

	async findOne(id: number): Promise<Product> {
		const product = await this.productRepository.findOneOrFail({
			select: ['_id', 'name', 'price', 'status', 'image'],
			where: { _id: new mongodb.ObjectId(id) }
		})

		if (!id) {
			throw new NotFoundException(`Não achei um Produto com o id ${id}`)
		}
		return product
	}

	async remove(id: number): Promise<void> {
		await this.findOne(+id)

		if (!id) {
			throw new NotFoundException(`Não achei um Produto com o id ${id}`)
		}
		this.productRepository.softDelete({ _id: new mongodb.ObjectId(id) })
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

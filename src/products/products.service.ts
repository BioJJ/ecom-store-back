import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Product } from './entities/product.entity'
import { MongoRepository } from 'typeorm'

@Injectable()
export class ProductsService {
	constructor(
		@InjectRepository(Product)
		private readonly productRepository: MongoRepository<Product>
	) {}

	async create(createProductDto: CreateProductDto): Promise<Product> {
		const product = this.productRepository.create(createProductDto)
		return await this.productRepository.save(product)
	}

	async update(id: string, updateProductDto: UpdateProductDto): Promise<void> {
		console.log(updateProductDto)
		const product = await this.findOne(+id)
		this.productRepository.merge(product, updateProductDto)
		await this.productRepository.save(product)
	}

	async findAll(): Promise<Product[]> {
		return await this.productRepository.find({
			select: ['_id', 'name', 'price', 'status']
		})
	}

	async findOne(id: number): Promise<Product> {
		const product = await this.productRepository.findOneOrFail({
			select: ['_id', 'name', 'price', 'status'],
			where: { _id: id }
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
		this.productRepository.softDelete({ _id: id })
	}
}

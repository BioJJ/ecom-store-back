import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	HttpCode,
	HttpStatus
} from '@nestjs/common'
import { ProductsService } from './products.service'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { Product } from './entities/product.entity'
import { ApiBody, ApiTags } from '@nestjs/swagger'

@Controller('products')
@ApiTags('Products')
export class ProductsController {
	constructor(private readonly productsService: ProductsService) {}

	@Post()
	@ApiBody({ type: CreateProductDto })
	async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
		return await this.productsService.create(createProductDto)
	}

	@Get()
	async findAll(): Promise<Product[]> {
		return await this.productsService.findAll()
	}

	@Get(':id')
	async findOne(@Param('id') id: number): Promise<Product> {
		return await this.productsService.findOne(id)
	}

	@Patch(':id')
	@ApiBody({ type: UpdateProductDto })
	async update(
		@Param('id') id: string,
		@Body() updateProductDto: UpdateProductDto
	): Promise<void> {
		return await this.productsService.update(id, updateProductDto)
	}

	@Delete(':id')
	@HttpCode(HttpStatus.NO_CONTENT)
	async remove(@Param('id') id: number): Promise<void> {
		return await this.productsService.remove(id)
	}
}

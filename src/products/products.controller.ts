import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	HttpCode,
	HttpStatus,
	UseInterceptors,
	UploadedFile
} from '@nestjs/common'
import { ProductsService } from './products.service'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { Product } from './entities/product.entity'
import { ApiBody, ApiTags } from '@nestjs/swagger'
import { FileInterceptor } from '@nestjs/platform-express'

@Controller('products')
@ApiTags('Products')
export class ProductsController {
	constructor(private readonly productsService: ProductsService) {}

	@Post()
	@ApiBody({ type: CreateProductDto })
	@UseInterceptors(FileInterceptor('file'))
	async create(
		@Body() createProductDto: CreateProductDto,
		@UploadedFile() file: Express.Multer.File
	): Promise<Product> {
		return await this.productsService.create(createProductDto, file)
	}

	@Patch(':id')
	@ApiBody({ type: UpdateProductDto })
	@UseInterceptors(FileInterceptor('file'))
	async update(
		@Param('id') id: string,
		@Body() updateProductDto: UpdateProductDto,
		@UploadedFile() file: Express.Multer.File
	): Promise<void> {
		return await this.productsService.update(id, updateProductDto, file)
	}

	@Get()
	async findAll(): Promise<Product[]> {
		return await this.productsService.findAll()
	}

	@Get(':id')
	async findOne(@Param('id') id: number): Promise<Product> {
		return await this.productsService.findOne(id)
	}

	@Delete(':id')
	@HttpCode(HttpStatus.NO_CONTENT)
	async remove(@Param('id') id: number): Promise<void> {
		return await this.productsService.remove(id)
	}
}

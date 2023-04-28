import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseInterceptors,
	UploadedFile,
	HttpCode,
	HttpStatus
} from '@nestjs/common'
import { CategoriesService } from './categories.service'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { ApiBody, ApiTags } from '@nestjs/swagger'
import { FileInterceptor } from '@nestjs/platform-express'
import { Category } from './entities/category.entity'
import { ObjectId } from 'mongodb'

@Controller('categories')
@ApiTags('Categories')
export class CategoriesController {
	constructor(private readonly categoriesService: CategoriesService) {}

	@Post()
	@ApiBody({ type: CreateCategoryDto })
	@UseInterceptors(FileInterceptor('file'))
	async create(
		@Body() createCategoryDto: CreateCategoryDto,
		@UploadedFile() file: Express.Multer.File
	): Promise<Category> {
		return await this.categoriesService.create(createCategoryDto, file)
	}

	@Patch(':id')
	@ApiBody({ type: CreateCategoryDto })
	@UseInterceptors(FileInterceptor('file'))
	async update(
		@Param('id') id: ObjectId,
		@Body() updateCategoryDto: UpdateCategoryDto,
		@UploadedFile() file: Express.Multer.File
	): Promise<void> {
		return this.categoriesService.update(id, updateCategoryDto, file)
	}

	@Get()
	async findAll(): Promise<Category[]> {
		return await this.categoriesService.findAll()
	}

	@Get(':id')
	async findOne(@Param('id') id: ObjectId): Promise<Category> {
		return await this.categoriesService.findOne(id)
	}

	@Delete(':id')
	@HttpCode(HttpStatus.NO_CONTENT)
	async remove(@Param('id') id: ObjectId): Promise<void> {
		return await this.categoriesService.remove(id)
	}
}

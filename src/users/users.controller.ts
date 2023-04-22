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
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { ApiBody, ApiTags } from '@nestjs/swagger'
import { User } from './entities/user.entity'

@Controller('users')
@ApiTags('Users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	@ApiBody({ type: CreateUserDto })
	async create(@Body() createUserDto: CreateUserDto): Promise<User> {
		return await this.usersService.create(createUserDto)
	}

	@Patch(':id')
	async update(
		@Param('id') id: string,
		@Body() updateUserDto: UpdateUserDto
	): Promise<void> {
		return await this.usersService.update(+id, updateUserDto)
	}

	@Get()
	async findAll(): Promise<User[]> {
		return await this.usersService.findAll()
	}

	@Get(':id')
	async findOne(@Param('id') id: number): Promise<User> {
		return await this.usersService.findOne(id)
	}

	@Delete(':id')
	@HttpCode(HttpStatus.NO_CONTENT)
	async remove(@Param('id') id: string): Promise<void> {
		return await this.usersService.remove(+id)
	}

	@Patch(':id/activate')
	@HttpCode(HttpStatus.NO_CONTENT)
	activate(@Param('id') id: number) {
		return this.usersService.activate(id)
	}

	@Patch(':id/inactivate')
	@HttpCode(HttpStatus.NO_CONTENT)
	inactivate(@Param('id') id: number) {
		return this.usersService.inactivate(id)
	}
}

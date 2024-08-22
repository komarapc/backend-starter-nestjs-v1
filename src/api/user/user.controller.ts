import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Query,
	Res,
} from '@nestjs/common'
import { UserService } from '@/api/user/user.service'
import { FastifyReply } from 'fastify'
import {
	UserChangePasswordDto,
	UserCrateDto,
	UserQueries,
} from '@/api/user/user.dto'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

@ApiTags('user')
@ApiBearerAuth()
@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get()
	async findAll(@Res() res: FastifyReply, @Query() query: UserQueries) {
		const limit = query.limit ? Number(query.limit) : 10
		const page = query.page ? Number(query.page) : 1
		const data = await this.userService.findAll({ ...query, limit, page })
		res.status(data.statusCode).send(data)
	}

	@Get(':id')
	async findOne(@Param('id') id: string, @Res() res: FastifyReply) {
		const data = await this.userService.findOneById(id)
		res.status(data.statusCode).send(data)
	}

	@Post()
	async create(@Body() userDto: UserCrateDto, @Res() res: FastifyReply) {
		const data = await this.userService.create(userDto)
		res.status(data.statusCode).send(data)
	}

	@Post('change-password')
	async changePassword(
		@Body() body: UserChangePasswordDto,
		@Res() res: FastifyReply,
	) {
		const response = await this.userService.changePassword(body)
		res.status(response.statusCode).send(response)
	}

	@Delete(':id')
	async delete(@Param('id') id: string, @Res() res: FastifyReply) {
		const response = await this.userService.delete(id)
		res.status(response.statusCode).send(response)
	}

	@Post(':id/restore')
	async restore(@Param('id') id: string, @Res() res: FastifyReply) {
		const response = await this.userService.restore(id)
		res.status(response.statusCode).send(response)
	}
}

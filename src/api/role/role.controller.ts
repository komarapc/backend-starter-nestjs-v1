import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Query,
	Res,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { RoleCreateDto, RoleQuery } from '@/api/role/role.dto'
import { FastifyReply } from 'fastify'
import { RoleService } from '@/api/role/role.service'

@ApiTags('role')
@Controller('role')
export class RoleController {
	constructor(private readonly roleService: RoleService) {}

	@Get()
	async findAll(@Query() query: RoleQuery, @Res() res: FastifyReply) {
		const page = query.page ? Number(query.page) : 1
		const limit = query.limit ? Number(query.limit) : 10
		const response = await this.roleService.findAll({ ...query, page, limit })
		return res.status(response.statusCode).send(response)
	}

	@Get(':id')
	async findOne(@Param('id') id: string, @Res() res: FastifyReply) {
		const response = await this.roleService.findOne(id)
		res.status(response.statusCode).send(response)
	}

	@Post()
	async create(@Body() body: RoleCreateDto, @Res() res: FastifyReply) {
		const response = await this.roleService.create(body)
		res.status(response.statusCode).send(response)
	}

	@Patch(':id')
	async update(
		@Param('id') id: string,
		@Body() body: RoleCreateDto,
		@Res() res: FastifyReply,
	) {
		const response = await this.roleService.update(id, body)
		res.status(response.statusCode).send(response)
	}

	@Delete(':id')
	async delete(@Param('id') id: string, @Res() res: FastifyReply) {
		const response = await this.roleService.delete(id)
		res.status(response.statusCode).send(response)
	}
}

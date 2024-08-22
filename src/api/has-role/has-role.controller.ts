import { Body, Controller, Delete, Get, Param, Post, Res } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { HasRoleService } from '@/api/has-role/has-role.service'
import { FastifyReply } from 'fastify'
import { HasRoleDto } from '@/api/has-role/has-role.dto'
@ApiTags('has-role')
@ApiBearerAuth()
@Controller('has-role')
export class HasRoleController {
	constructor(private readonly hasRoleService: HasRoleService) {}

	@Get(':id')
	async findOne(@Param('id') id: string, @Res() res: FastifyReply) {
		const response = await this.hasRoleService.findById(id)
		res.status(response.statusCode).send(response)
	}

	@Post()
	async store(@Body() body: HasRoleDto, @Res() res: FastifyReply) {
		const response = await this.hasRoleService.store(body)
		res.status(response.statusCode).send(response)
	}

	@Delete(':id')
	async delete(@Param('id') id: string, @Res() res: FastifyReply) {
		const response = await this.hasRoleService.delete(id)
		res.status(response.statusCode).send(response)
	}
}

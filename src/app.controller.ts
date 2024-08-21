import { Controller, Get, Res } from '@nestjs/common'
import { AppService } from './app.service'
import { FastifyReply } from 'fastify'
import { ApiTags } from '@nestjs/swagger'
@ApiTags('/')
@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	async getIndex(@Res() reply: FastifyReply) {
		const response = await this.appService.getDescription()
		reply.status(response.statusCode).send(response)
	}
}

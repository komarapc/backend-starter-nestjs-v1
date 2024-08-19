import { Controller, Get, Req, Res } from '@nestjs/common'
import { AppService } from './app.service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { Request } from 'express'
@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	async getIndex(@Res() reply: FastifyReply) {
		const response = await this.appService.getDescription()
		reply.status(response.statusCode).send(response)
	}
}

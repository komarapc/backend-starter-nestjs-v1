import { Controller, Get, Res } from '@nestjs/common'
import { AppService } from './app.service'
import { Response } from 'express'

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	async getIndex(@Res() res: Response) {
		const response = await this.appService.getDescription()
		res.status(response.statusCode).json(response)
	}
}

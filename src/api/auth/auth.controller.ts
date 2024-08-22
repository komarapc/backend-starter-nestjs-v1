import { Body, Controller, Post, Req, Res } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { AuthService } from '@/api/auth/auth.service'
import { FastifyReply } from 'fastify'
import { AuthSignInDto, AuthSignInRoleDto } from '@/api/auth/auth.dto'
import { Request } from 'express'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('sign-in')
	async signIn(@Body() body: AuthSignInDto, @Res() res: FastifyReply) {
		const response = await this.authService.signIn(body)
		res.status(response.statusCode).send(response)
	}

	@ApiBearerAuth()
	@Post('sign-in-role')
	async signInRole(
		@Body() body: AuthSignInRoleDto,
		@Req() req: Request,
		@Res() res: FastifyReply,
	) {
		const response = await this.authService.signInRole(body, req)
		res.status(response.statusCode).send(response)
	}

	@ApiBearerAuth()
	@Post('refresh-token')
	async refreshToken(@Req() req: Request, @Res() res: FastifyReply) {
		const response = await this.authService.refreshToken(req)
		res.status(response.statusCode).send(response)
	}
}

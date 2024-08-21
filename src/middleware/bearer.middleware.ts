import {
	Injectable,
	Logger,
	NestMiddleware,
	Scope,
	UnauthorizedException,
} from '@nestjs/common'
import { NextFunction, Request } from 'express'
import { ServerResponse } from 'http'
import { TokenService } from '@/services/token.service'

@Injectable({ scope: Scope.REQUEST })
class BearerMiddleware implements NestMiddleware {
	private readonly logger = new Logger(BearerMiddleware.name)
	constructor(private readonly tokenService: TokenService) {}
	async use(req: Request, res: ServerResponse, next: NextFunction) {
		try {
			if (!req.headers.authorization)
				throw new UnauthorizedException('Unauthorized')
			const [bearer, token] = req.headers.authorization.split(' ')
			if (bearer !== 'Bearer' || !token)
				throw new UnauthorizedException('Unauthorized')
			this.tokenService.setToken(token)

			if (!this.tokenService.validateToken())
				throw new UnauthorizedException('Unauthorized')
		} catch (err) {
			this.logger.error(`${err.status} - ${err.message}`)
			res.writeHead(err.status || 500, { 'Content-Type': 'application/json' })
			res.end(
				JSON.stringify({
					statusCode: err.status,
					message: err.message,
				}),
			)
		}
		next()
	}
}

export { BearerMiddleware }

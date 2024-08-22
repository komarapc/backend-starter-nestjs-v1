import {
	MiddlewareConsumer,
	Module,
	NestModule,
	RequestMethod,
} from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { PrismaService } from '@/services/prisma.service'
import { UserRepository } from '@/api/user/user.repository'
import { HasRoleRepository } from '@/api/has-role/has-role.repository'
import { TokenService } from '@/services/token.service'
import { PaginationService } from '@/services/pagination.service'
import { AuthLogRepository } from '@/api/auth-log/auth-log.repository'
import { RoleRepository } from '@/api/role/role.repository'
import { BearerMiddleware } from '@/middleware/bearer.middleware'

@Module({
	controllers: [AuthController],
	providers: [
		AuthService,
		PrismaService,
		UserRepository,
		HasRoleRepository,
		TokenService,
		PaginationService,
		AuthLogRepository,
		RoleRepository,
	],
})
export class AuthModule implements NestModule {
	configure(consumer: MiddlewareConsumer): any {
		consumer
			.apply(BearerMiddleware)
			.exclude({ path: '/auth/sign-in', method: RequestMethod.POST })
			.forRoutes(AuthController)
	}
}

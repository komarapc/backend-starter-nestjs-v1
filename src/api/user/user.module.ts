import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { PrismaService } from '@/services/prisma.service'
import { PaginationService } from '@/services/pagination.service'
import { UserRepository } from '@/api/user/user.repository'
import { RoleRepository } from '@/api/role/role.repository'
import { TokenService } from '@/services/token.service'
import { BearerMiddleware } from '@/middleware/bearer.middleware'

@Module({
	controllers: [UserController],
	providers: [
		BearerMiddleware,
		TokenService,
		UserService,
		PrismaService,
		PaginationService,
		UserRepository,
		RoleRepository,
		TokenService,
	],
})
export class UserModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(BearerMiddleware).forRoutes(UserController)
	}
}

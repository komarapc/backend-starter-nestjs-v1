import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { RoleController } from './role.controller'
import { RoleService } from './role.service'
import { PrismaService } from '@/services/prisma.service'
import { RoleRepository } from './role.repository'
import { PaginationService } from '@/services/pagination.service'
import { BearerMiddleware } from '@/middleware/bearer.middleware'
import { TokenService } from '@/services/token.service'

@Module({
	controllers: [RoleController],
	providers: [
		BearerMiddleware,
		TokenService,
		RoleService,
		PrismaService,
		PrismaService,
		PaginationService,
		RoleRepository,
	],
})
export class RoleModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(BearerMiddleware).forRoutes(RoleController)
	}
}

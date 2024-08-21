import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { HasRoleController } from './has-role.controller'
import { HasRoleService } from './has-role.service'
import { PrismaService } from '@/services/prisma.service'
import { HasRoleRepository } from '@/api/has-role/has-role.repository'
import { BearerMiddleware } from '@/middleware/bearer.middleware'
import { TokenService } from '@/services/token.service'

@Module({
	controllers: [HasRoleController],
	providers: [
		BearerMiddleware,
		TokenService,
		HasRoleService,
		PrismaService,
		HasRoleRepository,
	],
})
export class HasRoleModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(BearerMiddleware).forRoutes(HasRoleController)
	}
}

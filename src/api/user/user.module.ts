import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { PrismaService } from '@/services/prisma.service'
import { PaginationService } from '@/services/pagination.service'
import { UserRepository } from '@/api/user/user.repository'
import { RoleRepository } from '@/api/role/role.repository'

@Module({
	controllers: [UserController],
	providers: [
		UserService,
		PrismaService,
		PaginationService,
		UserRepository,
		RoleRepository,
	],
})
export class UserModule {}

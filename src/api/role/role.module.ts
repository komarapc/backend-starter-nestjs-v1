import { Module } from '@nestjs/common'
import { RoleController } from './role.controller'
import { RoleService } from './role.service'
import { PrismaService } from '@/services/prisma.service'
import { RoleRepository } from './role.repository'
import { PaginationService } from '@/services/pagination.service'

@Module({
	controllers: [RoleController],
	providers: [
		RoleService,
		PrismaService,
		PrismaService,
		PaginationService,
		RoleRepository,
	],
})
export class RoleModule {}

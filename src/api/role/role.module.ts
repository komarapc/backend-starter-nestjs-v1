import { Module } from '@nestjs/common'
import { RoleController } from './role.controller'
import { RoleService } from './role.service'
import { PrismaService } from '@/services/prisma.service'
import { RoleRepository } from './role.repository'

@Module({
	controllers: [RoleController],
	providers: [RoleService, PrismaService, RoleRepository],
})
export class RoleModule {}

import { Module } from '@nestjs/common'
import { HasRoleController } from './has-role.controller'
import { HasRoleService } from './has-role.service'
import { PrismaService } from '@/services/prisma.service'
import { HasRoleRepository } from '@/api/has-role/has-role.repository'

@Module({
	controllers: [HasRoleController],
	providers: [HasRoleService, PrismaService, HasRoleRepository],
})
export class HasRoleModule {}

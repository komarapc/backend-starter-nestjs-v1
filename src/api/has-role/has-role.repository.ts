import { PrismaService } from '@/services/prisma.service'
import { Injectable } from '@nestjs/common'
import { HasRoleDto } from '@/api/has-role/has-role.dto'
import { generateId } from '@/lib/utils'

@Injectable()
export class HasRoleRepository {
	constructor(private readonly prisma: PrismaService) {}

	async findById(id: string) {
		return this.prisma.hasRoles.findUnique({
			where: { id },
			include: { Role: true, User: true },
		})
	}
	async findByRoleAndUserId(roleId: string, userId: string) {
		return this.prisma.hasRoles.findFirst({ where: { userId, roleId } })
	}
	async create(data: HasRoleDto) {
		return this.prisma.hasRoles.create({ data: { id: generateId(), ...data } })
	}
	async delete(id: string) {
		return this.prisma.hasRoles.delete({ where: { id } })
	}
}

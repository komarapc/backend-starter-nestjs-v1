import { PrismaService } from '@/services/prisma.service'
import { Injectable } from '@nestjs/common'
import { RoleCreateDto, RoleQuery } from '@/api/role/role.dto'
import { PaginationService } from '@/services/pagination.service'
import { generateId } from '@/lib/utils'

@Injectable()
export class RoleRepository {
	constructor(
		private readonly prisma: PrismaService,
		private readonly paginationService: PaginationService,
	) {}
	async findAll(query: RoleQuery) {
		const { page, limit, roleName } = query
		const { take, skip } = this.paginationService.getPagination(page, limit)
		const where = roleName
			? { roleName: { contains: roleName }, deletedAt: null }
			: { deletedAt: null }
		return this.prisma.roles.findMany({ where, skip, take })
	}
	async findAllCount(query: RoleQuery) {
		const { roleName } = query
		const where = roleName
			? { roleName: { contains: roleName }, deletedAt: null }
			: { deletedAt: null }
		return this.prisma.roles.count({ where })
	}
	async findById(id: string) {
		return this.prisma.roles.findUnique({ where: { id } })
	}
	async findByRoleName(roleName: string) {
		return this.prisma.roles.findUnique({ where: { roleName } })
	}
	async create(data: RoleCreateDto) {
		return this.prisma.$transaction(async (prisma) => {
			const role = await prisma.roles.create({
				data: {
					id: generateId(),
					roleName: data.roleName,
				},
			})
			return { role }
		})
	}
	async update(id: string, data: RoleCreateDto) {
		return this.prisma.$transaction(async (prisma) => {
			const role = await prisma.roles.update({
				where: { id },
				data: {
					roleName: data.roleName,
				},
			})
			return { role }
		})
	}
	async delete(id: string) {
		return this.prisma.roles.update({
			where: { id },
			data: { deletedAt: new Date() },
		})
	}
}

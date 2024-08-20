import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/services/prisma.service'
import {
	UserChangePasswordDto,
	UserCrateDto,
	UserQueries,
} from '@/api/user/user.dto'
import { PaginationService } from '@/services/pagination.service'
import { nanoid } from 'nanoid'

@Injectable()
export class UserRepository {
	private readonly selectWithoutPassword = {
		id: true,
		username: true,
		email: true,
	}

	constructor(
		private readonly prisma: PrismaService,
		private readonly paginationService: PaginationService,
	) {}

	async findAll(query: UserQueries) {
		const { name, email, page, limit } = query
		const { skip, take } = this.paginationService.getPagination(page, limit)
		const whereClause = {
			username: {
				contains: name,
			},
			email: {
				contains: email,
			},
			deletedAt: null,
		}
		return this.prisma.users.findMany({
			where: whereClause,
			select: this.selectWithoutPassword,
			skip,
			take,
		})
	}

	async countFindAll(query: UserQueries) {
		const whereClause = {
			username: {
				contains: query.name,
			},
			email: {
				contains: query.email,
			},
			deletedAt: null,
		}

		return this.prisma.users.count({
			where: whereClause,
		})
	}

	async findOneById(id: string) {
		return this.prisma.users.findUnique({
			where: { id },
		})
	}

	async findByEmail(email: string) {
		return this.prisma.users.findUnique({
			where: { email },
		})
	}
	async create(userDto: UserCrateDto) {
		return this.prisma.$transaction(async (prisma) => {
			const user_id = nanoid()
			const user = await prisma.users.create({
				data: {
					id: user_id,
					username: userDto.name,
					email: userDto.email,
					password: userDto.password,
				},
			})

			const hasRoles = userDto.has_role.map((role) => ({
				id: nanoid(),
				userId: user_id,
				roleId: role.role_id,
			}))

			await prisma.hasRoles.createMany({
				data: hasRoles,
			})

			return user
		})
	}
	async updatePassword(data: UserChangePasswordDto) {
		return this.prisma.users.update({
			where: { email: data.email },
			data: { password: data.new_password },
		})
	}

	async delete(id: string) {
		return this.prisma.users.update({
			where: { id },
			data: { deletedAt: new Date() },
		})
	}

	async restore(id: string) {
		return this.prisma.users.update({
			where: { id },
			data: { deletedAt: null },
		})
	}
}

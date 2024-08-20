import { PrismaService } from '@/services/prisma.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class RoleRepository {
	constructor(private readonly prisma: PrismaService) {}

	async findById(id: string) {
		return await this.prisma.roles.findUnique({ where: { id } })
	}
}

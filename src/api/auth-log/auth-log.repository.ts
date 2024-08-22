import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/services/prisma.service'
import { AuthLogDto } from '@/api/auth-log/auth-log.dto'
import { generateId } from '@/lib/utils'

@Injectable()
export class AuthLogRepository {
	constructor(private readonly prisma: PrismaService) {}

	async store(data: AuthLogDto) {
		return this.prisma.authLogs.create({
			data: {
				id: generateId(),
				...data,
			},
		})
	}
}

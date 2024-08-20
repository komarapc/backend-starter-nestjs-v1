import { PrismaService } from '@/services/prisma.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class HasRoleRepository {
	constructor(private readonly prisma: PrismaService) {}
}

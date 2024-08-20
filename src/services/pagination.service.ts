import { Injectable } from '@nestjs/common'

@Injectable()
export class PaginationService {
	public getPagination(
		page: number,
		limit: number,
	): { skip: number; take: number } {
		const skip = (page - 1) * limit
		return { skip, take: limit }
	}
}

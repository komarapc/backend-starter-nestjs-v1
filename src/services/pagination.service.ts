import { Injectable } from '@nestjs/common'

type MetaPage = {
	page: number
	limit: number
	total_data: number
}

@Injectable()
export class PaginationService {
	public getPagination(
		page: number,
		limit: number,
	): { skip: number; take: number } {
		const skip = (page - 1) * limit
		return { skip, take: Number(limit) }
	}

	public getMetaPage(props: MetaPage) {
		const { page, limit, total_data } = props
		return {
			total_data,
			total_page: Math.ceil(total_data / limit),
			current_page: page,
			limit,
		}
	}
}

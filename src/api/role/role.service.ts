import { HttpStatus, Injectable } from '@nestjs/common'
import { RoleRepository } from '@/api/role/role.repository'
import { RoleCreateDto, RoleQuery } from '@/api/role/role.dto'
import { responseData, ResponseData, responseError } from '@/lib/response-data'
import { PaginationService } from '@/services/pagination.service'

@Injectable()
export class RoleService {
	constructor(
		private readonly roleRepository: RoleRepository,
		private readonly paginationService: PaginationService,
	) {}

	async findAll(query: RoleQuery): Promise<ResponseData> {
		try {
			const [roles, total] = await Promise.all([
				this.roleRepository.findAll(query),
				this.roleRepository.findAllCount(query),
			])
			if (!roles.length)
				return responseData({
					code: HttpStatus.NOT_FOUND,
					message: 'Data not found',
				})
			return responseData({
				code: HttpStatus.OK,
				message: 'OK',
				data: {
					roles,
					meta: this.paginationService.getMetaPage({
						total_data: total,
						...query,
					}),
				},
			})
		} catch (e) {
			return responseError(e)
		}
	}

	async findOne(id: string): Promise<ResponseData> {
		try {
			const role = await this.roleRepository.findById(id)
			if (!role || role.deletedAt)
				return responseData({
					code: HttpStatus.NOT_FOUND,
					message: 'Data not found',
				})
			return responseData({
				code: HttpStatus.OK,
				message: 'OK',
				data: role,
			})
		} catch (e) {
			return responseError(e)
		}
	}

	async create(data: RoleCreateDto): Promise<ResponseData> {
		try {
			const existingRole = await this.roleRepository.findByRoleName(
				data.roleName,
			)
			if (existingRole)
				return responseData({
					code: HttpStatus.CONFLICT,
					message: 'Role already exists',
				})
			const role = await this.roleRepository.create(data)
			return responseData({
				code: HttpStatus.CREATED,
				message: 'Role created successfully',
				data: role,
			})
		} catch (e) {
			return responseError(e)
		}
	}

	async update(id: string, data: RoleCreateDto) {
		try {
			const existingRole = await this.roleRepository.findById(id)
			if (!existingRole || existingRole.deletedAt)
				return responseData({
					code: HttpStatus.NOT_FOUND,
					message: 'Data not found',
				})
			const role = await this.roleRepository.update(id, data)
			return responseData({
				code: HttpStatus.OK,
				message: 'Role updated successfully',
				data: role,
			})
		} catch (e) {
			return responseError(e)
		}
	}

	async delete(id: string) {
		try {
			const existingRole = await this.roleRepository.findById(id)
			if (!existingRole || existingRole.deletedAt)
				return responseData({
					code: HttpStatus.NOT_FOUND,
					message: 'Data not found',
				})
			await this.roleRepository.delete(id)
			return responseData({
				code: HttpStatus.OK,
				message: 'Role deleted successfully',
			})
		} catch (e) {
			return responseError(e)
		}
	}
}

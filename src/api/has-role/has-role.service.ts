import { HttpStatus, Injectable } from '@nestjs/common'
import { HasRoleRepository } from '@/api/has-role/has-role.repository'
import { responseData, ResponseData, responseError } from '@/lib/response-data'
import { HasRoleDto } from '@/api/has-role/has-role.dto'

@Injectable()
export class HasRoleService {
	constructor(private readonly hasRoleRepository: HasRoleRepository) {}

	async findById(id: string): Promise<ResponseData> {
		try {
			const hasRole = await this.hasRoleRepository.findById(id)
			if (!hasRole)
				return responseData({
					code: HttpStatus.NOT_FOUND,
					message: 'Data not found',
				})
			const { Role, User, ...rest } = hasRole
			return responseData({
				code: HttpStatus.OK,
				message: 'OK',
				data: {
					...rest,
					role: {
						id: Role.id,
						name: Role.roleName,
					},
					user: {
						id: User.id,
						username: User.username,
						email: User.email,
					},
				},
			})
		} catch (e) {
			return responseError(e)
		}
	}

	async store(data: HasRoleDto) {
		try {
			const existingHasRole = await this.hasRoleRepository.findByRoleAndUserId(
				data.roleId,
				data.userId,
			)
			if (existingHasRole)
				return responseData({
					code: HttpStatus.CONFLICT,
					message: 'Data already exists',
				})
			const hasRole = await this.hasRoleRepository.create(data)
			return responseData({
				code: HttpStatus.CREATED,
				message: 'Data created',
				data: hasRole,
			})
		} catch (e) {
			return responseError(e)
		}
	}

	async delete(id: string) {
		try {
			const hasRole = await this.hasRoleRepository.findById(id)
			if (!hasRole)
				return responseData({
					code: HttpStatus.NOT_FOUND,
					message: 'Data not found',
				})
			await this.hasRoleRepository.delete(id)
			return responseData({
				code: HttpStatus.OK,
				message: 'Data has been deleted',
			})
		} catch (e) {
			return responseError(e)
		}
	}
}

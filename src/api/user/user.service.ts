import { HttpStatus, Injectable } from '@nestjs/common'
import { UserRepository } from '@/api/user/user.repository'
import {
	UserChangePasswordDto,
	UserCrateDto,
	UserQueries,
} from '@/api/user/user.dto'
import { responseData, ResponseData, responseError } from '@/lib/response-data'
import { excludeFields } from '@/lib/utils'
import * as bcrypt from 'bcrypt'
import { env } from 'process'
@Injectable()
export class UserService {
	constructor(private readonly userRepository: UserRepository) {}

	async findAll(query: UserQueries): Promise<ResponseData> {
		try {
			const [users, total] = await Promise.all([
				this.userRepository.findAll(query),
				this.userRepository.countFindAll(query),
			])
			return responseData({
				code: HttpStatus.OK,
				message: 'Success',
				data: {
					users,
					meta: {
						total_data: total,
						total_page: Math.ceil(total / query.limit),
						page: query.page,
						limit: query.limit,
					},
				},
			})
		} catch (e) {
			return responseError(e)
		}
	}

	async findOneById(id: string): Promise<ResponseData> {
		try {
			const user = await this.userRepository.findOneById(id)
			if (!user)
				return responseData({
					code: HttpStatus.NOT_FOUND,
					message: 'User not found',
				})
			return responseData({
				code: HttpStatus.OK,
				message: 'Success',
				data: excludeFields(user, ['password']),
			})
		} catch (e) {
			return responseError(e)
		}
	}

	async create(userDto: UserCrateDto): Promise<ResponseData> {
		try {
			const userExist = await this.userRepository.findByEmail(userDto.email)
			if (userExist)
				return responseData({
					code: HttpStatus.CONFLICT,
					message: 'User already exist',
				})
			const hashPassword = bcrypt.hashSync(
				userDto.password,
				Number(env.SALT_ROUND),
			)
			const user = await this.userRepository.create({
				...userDto,
				password: hashPassword,
			})
			return responseData({
				code: HttpStatus.CREATED,
				message: 'User created',
				data: excludeFields(user, ['password']),
			})
		} catch (e) {
			return responseError(e)
		}
	}

	async changePassword(body: UserChangePasswordDto): Promise<ResponseData> {
		try {
			const existUser = await this.userRepository.findByEmail(body.email)
			if (!existUser)
				return responseData({
					code: HttpStatus.NOT_FOUND,
					message: 'User not found',
				})
			const isMatch = bcrypt.compareSync(body.old_password, existUser.password)
			if (!isMatch)
				return responseData({
					code: HttpStatus.BAD_REQUEST,
					message: 'Old password not match',
				})

			const hashPassword = bcrypt.hashSync(
				body.new_password,
				Number(env.SALT_ROUND),
			)

			await this.userRepository.updatePassword({
				...body,
				new_password: hashPassword,
			})
			return responseData({
				code: HttpStatus.CREATED,
				message: 'Password updated',
			})
		} catch (e) {
			return responseError(e)
		}
	}

	async delete(id: string) {
		try {
			const user = await this.userRepository.findOneById(id)
			if (!user || user.deletedAt)
				return responseData({
					code: HttpStatus.NOT_FOUND,
					message: 'User not found',
				})
			await this.userRepository.delete(id)
			return responseData({
				code: HttpStatus.OK,
				message: 'User deleted',
			})
		} catch (e) {
			return responseError(e)
		}
	}

	async restore(id: string) {
		try {
			const user = await this.userRepository.findOneById(id)
			if (!user)
				return responseData({
					code: HttpStatus.NOT_FOUND,
					message: 'User not found',
				})
			if (!user.deletedAt)
				return responseData({
					code: HttpStatus.CONFLICT,
					message: 'User not deleted',
				})

			await this.userRepository.restore(id)
			return responseData({ code: HttpStatus.OK, message: 'User restored' })
		} catch (e) {
			return responseError(e)
		}
	}
}

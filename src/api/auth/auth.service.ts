import { HttpStatus, Injectable } from '@nestjs/common'
import { AuthSignInDto, AuthSignInRoleDto } from '@/api/auth/auth.dto'
import {
	createResponse,
	responseData,
	responseError,
} from '@/lib/response-data'
import { UserRepository } from '@/api/user/user.repository'
import { comparePassword, excludeFields } from '@/lib/utils'
import { TokenService } from '@/services/token.service'
import { HasRoleRepository } from '@/api/has-role/has-role.repository'
import { RoleRepository } from '@/api/role/role.repository'
import { Request } from 'express'
import { AuthLogRepository } from '@/api/auth-log/auth-log.repository'

@Injectable()
export class AuthService {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly tokenService: TokenService,
		private readonly hasRoleRepository: HasRoleRepository,
		private readonly roleRepository: RoleRepository,
		private readonly authLogRepository: AuthLogRepository,
	) {}

	async signIn(body: AuthSignInDto) {
		try {
			const user = await this.userRepository.findByEmail(body.email)
			if (!user) return createResponse(HttpStatus.NOT_FOUND, 'User not found')
			if (!comparePassword(body.password, user.password))
				return createResponse(HttpStatus.UNAUTHORIZED, 'Unauthorized')
			const payloadToken = {
				id: user.id,
				email: user.email,
				rememberMe: body.rememberMe,
			}
			const data = {
				user: excludeFields(user, ['password']),
				token: this.tokenService.createNewToken(payloadToken, '5m'),
				roles: await this.hasRoleRepository
					.findByUserId(user.id)
					.then((res) =>
						res.map((r) => ({ roleId: r.roleId, roleName: r.Role.roleName })),
					),
			}
			return createResponse(
				HttpStatus.OK,
				"Please select the user's role",
				data,
			)
		} catch (e) {
			return responseError(e)
		}
	}

	async signInRole(body: AuthSignInRoleDto, request: Request) {
		try {
			const unauthorized = createResponse(
				HttpStatus.UNAUTHORIZED,
				'Unauthorized',
			)
			if (!this.tokenService.getToken()) return unauthorized
			const payloadToken: any = this.tokenService.getPayload()
			const { id: userId, rememberMe } = payloadToken
			if (
				!(await this.hasRoleRepository.findByRoleAndUserId(body.roleId, userId))
			)
				return unauthorized
			const [user, roles] = await Promise.all([
				this.userRepository.findOneById(userId),
				this.roleRepository.findById(body.roleId),
			])
			const expiresIn = rememberMe ? '30d' : '1d'
			await this.authLogRepository.store({
				userId: user.id,
				roleId: body.roleId,
				token: this.tokenService.getToken(),
				ipAddress: request.ip,
				headerRequest: request.headers,
				device: request.headers['user-agent'],
			})
			return responseData({
				code: HttpStatus.OK,
				message: `You are logged in as ${roles.roleName}`,
				data: {
					user: excludeFields(user, ['password']),
					role: roles,
					token: this.tokenService.createNewToken(
						{ id: user.id, email: user.email, roleId: body.roleId },
						expiresIn,
					),
				},
			})
		} catch (e) {
			return responseError(e)
		}
	}

	async refreshToken(request: Request) {
		try {
			const token = this.tokenService.getToken()
			if (!token) return createResponse(HttpStatus.UNAUTHORIZED, 'Unauthorized')
			const payloadToken: any = this.tokenService.getPayload()
			const { id, email, roleId, rememberMe } = payloadToken
			const user = await this.userRepository.findOneById(id)
			if (!user) return createResponse(HttpStatus.NOT_FOUND, 'User not found')
			const expiresIn = rememberMe ? '30d' : '1d'
			const newToken = this.tokenService.createNewToken(
				{ id, email, roleId },
				expiresIn,
			)
			await this.authLogRepository.store({
				userId: user.id,
				roleId,
				token,
				ipAddress: request.ip,
				headerRequest: request.headers,
				device: request.headers['user-agent'],
			})
			return responseData({
				code: HttpStatus.OK,
				message: 'Token refreshed',
				data: {
					user: excludeFields(user, ['password']),
					newToken,
				},
			})
		} catch (e) {
			return responseError(e)
		}
	}

	async checkToken(body: any) {}
}

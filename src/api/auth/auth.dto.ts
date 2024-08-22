import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsEmail, MinLength } from 'class-validator'

class AuthSignInDto {
	@ApiProperty({ name: 'email', required: true })
	@IsEmail()
	email: string

	@ApiProperty({ name: 'password', required: true })
	@MinLength(8)
	password: string

	@ApiProperty({ name: 'rememberMe', required: false })
	@IsBoolean()
	rememberMe: boolean
}

class AuthSignInRoleDto {
	@ApiProperty({ name: 'roleId', required: true })
	roleId: string
}

export { AuthSignInDto, AuthSignInRoleDto }

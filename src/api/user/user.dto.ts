import { Type } from 'class-transformer'
import {
	ArrayNotEmpty,
	IsArray,
	IsEmail,
	IsString,
	MinLength,
	ValidateNested,
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

interface UserQueries {
	name?: string
	email?: string
	page: number
	limit: number
}

class HasRole {
	@ApiProperty({ name: 'role_id', type: 'string', required: true })
	@IsString()
	role_id: string
}

class UserCrateDto {
	@ApiProperty({ name: 'name', type: 'string', required: true })
	@IsString()
	name: string

	@ApiProperty({ name: 'email', type: 'string', required: true })
	@IsEmail()
	email: string

	@ApiProperty({ name: 'password', type: 'string', required: true })
	@IsString()
	@MinLength(8)
	password: string

	@ApiProperty({ name: 'has_role', type: [HasRole], required: true })
	@IsArray()
	@ArrayNotEmpty()
	@ValidateNested({ each: true })
	@Type(() => HasRole)
	has_role: HasRole[]
}

class UserChangePasswordDto {
	@ApiProperty({ name: 'email', type: 'string', required: true })
	@IsEmail()
	email: string

	@ApiProperty({ name: 'old_password', type: 'string', required: true })
	@IsString()
	@MinLength(8)
	old_password: string

	@ApiProperty({ name: 'new_password', type: 'string', required: true })
	@IsString()
	@MinLength(8)
	new_password: string
}

export { UserQueries, UserCrateDto, UserChangePasswordDto }

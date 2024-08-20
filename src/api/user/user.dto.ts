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

class UserQueries {
	@ApiProperty({ name: 'name', type: 'string', required: false })
	name?: string
	@ApiProperty({ name: 'email', type: 'string', required: false })
	email?: string
	@ApiProperty({ name: 'page', type: 'number', required: true, example: 1 })
	page: number
	@ApiProperty({ name: 'limit', type: 'number', required: true, example: 10 })
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

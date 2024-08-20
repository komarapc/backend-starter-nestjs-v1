import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'
import { Type } from 'class-transformer'

export interface IRole {
	id: string
	roleName: string
}

export class RoleQuery {
	@ApiProperty({ name: 'roleName', required: false })
	@IsString()
	@IsOptional()
	roleName?: string

	@ApiProperty({ name: 'page', required: true, type: 'number', example: 1 })
	@IsNumber()
	@Type(() => Number)
	page: number

	@ApiProperty({ name: 'limit', required: true, type: 'number', example: 10 })
	@IsNumber()
	@Type(() => Number)
	limit: number
}

export class RoleCreateDto {
	@ApiProperty({ name: 'roleName', required: true, type: 'string' })
	@IsString()
	@IsNotEmpty()
	roleName: string
}

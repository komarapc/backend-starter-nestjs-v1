import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export interface IHasRole {
	id: string
	userId: string
	roleId: string
}

class HasRoleDto {
	@ApiProperty({ name: 'userId', type: String, required: true })
	@IsString()
	@IsNotEmpty()
	userId: string
	@ApiProperty({ name: 'roleId', type: String, required: true })
	@IsString()
	@IsNotEmpty()
	roleId: string
}

export { HasRoleDto }

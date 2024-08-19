import { HttpStatus, Injectable } from '@nestjs/common'
import { responseData, ResponseData, responseError } from '@/lib/response-data'
@Injectable()
export class AppService {
	getHello(): string {
		return 'Hello World!'
	}

	async getDescription(): Promise<ResponseData> {
		try {
			return responseData({
				code: HttpStatus.OK,
				message: 'OK',
				data: {
					description: 'This is a sample API built with NestJS',
					version: '1.0.0',
				},
			})
		} catch (error) {
			return responseError(error)
		}
	}
}

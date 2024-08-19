import { Injectable } from '@nestjs/common'
import { message } from '@/data/message'
@Injectable()
export class AppService {
	getHello(): string {
		return 'Hello World!'
	}
}

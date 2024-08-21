import { Injectable, Scope } from '@nestjs/common'
import * as jwt from 'jsonwebtoken'

@Injectable({ scope: Scope.REQUEST })
export class TokenService {
	private token: string = ''

	getToken(): string {
		return this.token
	}

	setToken(token: string) {
		this.token = token
	}

	validateToken(): boolean {
		try {
			jwt.verify(this.token, process.env.JWT_SECRET)
			return true
		} catch (err) {
			return false
		}
	}

	getPayload(): any {
		return jwt.decode(this.token)
	}

	setPayload(payload: any) {
		this.token = jwt.sign(payload, process.env.JWT_SECRET)
	}
}

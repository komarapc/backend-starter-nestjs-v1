import { Injectable, Scope } from '@nestjs/common'
import * as jwt from 'jsonwebtoken'

type expiresIn =
	| '1m'
	| '5m'
	| '15m'
	| '30m'
	| '1h'
	| '6h'
	| '12h'
	| '1d'
	| '7d'
	| '14d'
	| '30d'
	| '60d'
	| '90d'
	| '120d'
	| '180d'
	| '1y'

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

	createNewToken(payload: any, expiresIn: expiresIn): string {
		return jwt.sign(payload, process.env.JWT_SECRET, {
			expiresIn,
			algorithm: 'HS512',
		})
	}
}

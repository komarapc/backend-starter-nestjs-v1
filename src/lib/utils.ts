import * as crypto from 'crypto'
import { env } from 'process'
import { promisify } from 'util'

const createCipherKey = async () => {
	return (await promisify(crypto.scrypt)(env.SECRET_KEY, 'salt', 32)) as Buffer
}

const encrypt = async (text: string) => {
	const iv = crypto.randomBytes(16)
	const cipher = crypto.createCipheriv(
		'aes-256-cbc',
		await createCipherKey(),
		iv,
	)
	let encrypted = cipher.update(text)
	encrypted = Buffer.concat([encrypted, cipher.final()])
	return iv.toString('hex') + '$' + encrypted.toString('hex')
}

const decrypt = async (text: string) => {
	const textParts = text.split('$')
	const iv = Buffer.from(textParts.shift() as string, 'hex')
	const encryptedText = Buffer.from(textParts.join('$'), 'hex')
	const decipher = crypto.createDecipheriv(
		'aes-256-cbc',
		await createCipherKey(),
		iv,
	)
	let decrypted = decipher.update(encryptedText)
	decrypted = Buffer.concat([decrypted, decipher.final()])
	return decrypted.toString()
}

const excludeFields = <T>(data: T, fields: [keyof T]) => {
	const obj = { ...data }
	fields.forEach((field) => {
		delete obj[field]
	})
	return obj
}

export { createCipherKey, encrypt, decrypt, excludeFields }

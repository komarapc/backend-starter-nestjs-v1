import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import * as bcrypt from 'bcryptjs'
import { generateId } from '../src/lib/utils'

type Role = {
	id: string
	roleName: string
}

type User = {
	id: string
	username: string
	email: string
	password: string
}

type HasRole = {
	id: string
	userId: string
	roleId: string
}

const roles: Role[] = [
	{ id: generateId(), roleName: 'Admin' },
	{ id: generateId(), roleName: 'Guest' },
]

const users: User[] = [
	{
		id: generateId(),
		username: 'admin',
		email: 'admin@mail.com',
		password: bcrypt.hashSync('secretPassAdmin', 12),
	},
	{
		id: generateId(),
		username: 'guest',
		email: 'guest@mail.com',
		password: bcrypt.hashSync('secretPassGuest', 12),
	},
]

const hasRoles: HasRole[] = [
	{ id: generateId(), userId: users[0].id, roleId: roles[0].id },
	{ id: generateId(), userId: users[1].id, roleId: roles[1].id },
]

async function main() {
	for (const role of roles) {
		await prisma.roles.upsert({
			where: { roleName: role.roleName },
			update: {},
			create: role,
		})
	}

	for (const user of users) {
		await prisma.users.upsert({
			where: { email: user.email },
			update: {},
			create: user,
		})
	}

	// truncate table hasRole
	await prisma.hasRoles.deleteMany()
	for (const hasRole of hasRoles) {
		await prisma.hasRoles.create({
			data: hasRole,
		})
	}
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async (err) => {
		console.error(err)
		await prisma.$disconnect()
	})

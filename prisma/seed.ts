import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import { nanoid } from 'nanoid'
import * as bcrypt from 'bcryptjs'

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
	{ id: nanoid(), roleName: 'Admin' },
	{ id: nanoid(), roleName: 'Guest' },
]

const users: User[] = [
	{
		id: nanoid(),
		username: 'admin',
		email: 'admin@mail.com',
		password: bcrypt.hashSync('secretPassAdmin', 12),
	},
	{
		id: nanoid(),
		username: 'guest',
		email: 'guest@mail.com',
		password: bcrypt.hashSync('secretPassGuest', 12),
	},
]

const hasRoles: HasRole[] = [
	{ id: nanoid(), userId: users[0].id, roleId: roles[0].id },
	{ id: nanoid(), userId: users[1].id, roleId: roles[1].id },
]

async function main() {
	for (const role of roles) {
		await prisma.role.upsert({
			where: { roleName: role.roleName },
			update: {},
			create: role,
		})
	}

	for (const user of users) {
		await prisma.user.upsert({
			where: { email: user.email },
			update: {},
			create: user,
		})
	}

	// truncate table hasRole
	await prisma.hasRole.deleteMany()
	for (const hasRole of hasRoles) {
		await prisma.hasRole.create({
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

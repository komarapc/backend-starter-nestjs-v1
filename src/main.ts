import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { env } from 'process'
import { ValidationPipe } from '@nestjs/common'
import {
	FastifyAdapter,
	NestFastifyApplication,
} from '@nestjs/platform-fastify'

async function bootstrap() {
	const app = await NestFactory.create<NestFastifyApplication>(
		AppModule,
		new FastifyAdapter(),
	)
	app.enableCors()
	app.useGlobalPipes(new ValidationPipe())
	await app.listen(env.PORT, '0.0.0.0')
}
bootstrap()

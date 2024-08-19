import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import compression from '@fastify/compress'
import {
	FastifyAdapter,
	NestFastifyApplication,
} from '@nestjs/platform-fastify'
import { env } from 'process'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
	const app = await NestFactory.create<NestFastifyApplication>(
		AppModule,
		new FastifyAdapter(),
	)
	app.enableCors()
	app.register(compression, { encodings: ['gzip', 'deflate'] })
	app.useGlobalPipes(new ValidationPipe())
	await app.listen(env.PORT)
}
bootstrap()

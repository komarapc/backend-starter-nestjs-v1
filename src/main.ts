import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { env } from 'process'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	app.enableCors()
	app.useGlobalPipes(new ValidationPipe())
	await app.listen(env.PORT)
}
bootstrap()

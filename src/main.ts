import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { env } from 'process'
import { ValidationPipe } from '@nestjs/common'
import {
	FastifyAdapter,
	NestFastifyApplication,
} from '@nestjs/platform-fastify'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
	const app = await NestFactory.create<NestFastifyApplication>(
		AppModule,
		new FastifyAdapter(),
	)
	app.enableCors()
	app.useGlobalPipes(new ValidationPipe())
	const config = new DocumentBuilder()
		.setTitle('OpenAPI Documentations')
		.setDescription('The API description')
		.setLicense('MIT', 'https://opensource.org/licenses/MIT')
		.setVersion('1.0')
		.addBearerAuth()
		.build()
	const document = SwaggerModule.createDocument(app, config)
	SwaggerModule.setup('api', app, document, {
		swaggerOptions: {
			defaultModelsExpandDepth: -1,
		},
		customSiteTitle: 'API Documentation',
	})
	await app.listen(env.PORT, '0.0.0.0')
}
bootstrap().then((r) => r)

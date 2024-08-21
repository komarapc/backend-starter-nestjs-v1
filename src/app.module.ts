import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { UserModule } from './api/user/user.module'
import { RoleModule } from './api/role/role.module'
import { HasRoleModule } from './api/has-role/has-role.module'
import { AuthModule } from './api/auth/auth.module';

@Module({
	imports: [ConfigModule.forRoot(), UserModule, RoleModule, HasRoleModule, AuthModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}

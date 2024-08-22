import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { UserModule } from './api/user/user.module'
import { RoleModule } from './api/role/role.module'
import { HasRoleModule } from './api/has-role/has-role.module'
import { AuthModule } from './api/auth/auth.module';
import { AuthLogModule } from './api/auth-log/auth-log.module';

@Module({
	imports: [ConfigModule.forRoot(), UserModule, RoleModule, HasRoleModule, AuthModule, AuthLogModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}

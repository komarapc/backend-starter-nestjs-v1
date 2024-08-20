import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { UserModule } from './api/user/user.module';
import { RoleModule } from './api/role/role.module';
import { HasRoleModule } from './api/has-role/has-role.module';

@Module({
	imports: [ConfigModule.forRoot(), UserModule, RoleModule, HasRoleModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}

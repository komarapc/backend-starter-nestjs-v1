import { Module } from '@nestjs/common';
import { HasRoleController } from './has-role.controller';
import { HasRoleService } from './has-role.service';

@Module({
  controllers: [HasRoleController],
  providers: [HasRoleService]
})
export class HasRoleModule {}

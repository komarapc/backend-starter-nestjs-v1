import { Module } from '@nestjs/common';
import { AuthLogController } from './auth-log.controller';
import { AuthLogService } from './auth-log.service';

@Module({
  controllers: [AuthLogController],
  providers: [AuthLogService]
})
export class AuthLogModule {}

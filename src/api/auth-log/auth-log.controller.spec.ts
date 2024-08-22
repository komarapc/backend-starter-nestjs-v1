import { Test, TestingModule } from '@nestjs/testing';
import { AuthLogController } from './auth-log.controller';

describe('AuthLogController', () => {
  let controller: AuthLogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthLogController],
    }).compile();

    controller = module.get<AuthLogController>(AuthLogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { AuthLogService } from './auth-log.service';

describe('AuthLogService', () => {
  let service: AuthLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthLogService],
    }).compile();

    service = module.get<AuthLogService>(AuthLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

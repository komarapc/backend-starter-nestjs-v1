import { Test, TestingModule } from '@nestjs/testing';
import { HasRoleService } from './has-role.service';

describe('HasRoleService', () => {
  let service: HasRoleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HasRoleService],
    }).compile();

    service = module.get<HasRoleService>(HasRoleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { HasRoleController } from './has-role.controller';

describe('HasRoleController', () => {
  let controller: HasRoleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HasRoleController],
    }).compile();

    controller = module.get<HasRoleController>(HasRoleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

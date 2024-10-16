import { Test, TestingModule } from '@nestjs/testing';
import { SignUpController } from './sign-up.controller';
import { SignUpService } from './sign-up.service';
import { CreteUserDto } from './Dto/createUser.dto';

describe('SignUpController', () => {
  let signUpController: SignUpController;
  let signUpService: SignUpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SignUpController],
      providers: [
        {
          provide: SignUpService,
          useValue: {
            create: jest.fn(),  // Mock del servicio
          },
        },
      ],
    })
    .compile();

    signUpController = module.get<SignUpController>(SignUpController);
    signUpService = module.get<SignUpService>(SignUpService);
  });

  it('Should be defined', () => {
    expect(signUpController).toBeDefined();
  });

  describe('create', () => {
    it('Should call signUpService.create with the correct DTO', async () => {
      const createUserDto: CreteUserDto = { name: 'John', surname:'Elton', email: 'john@example.com', password: '123456' };
      const result = { id: 1, ...createUserDto, userToRole: [], userToPermission: [] }; // Respuesta simulada

      jest.spyOn(signUpService, 'create').mockResolvedValue(result);

      expect(await signUpController.create(createUserDto)).toEqual(result);
      expect(signUpService.create).toHaveBeenCalledWith(createUserDto);
    });
  });
});
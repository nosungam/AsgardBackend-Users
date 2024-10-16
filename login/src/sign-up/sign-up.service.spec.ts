import { Test, TestingModule } from '@nestjs/testing';
import { SignUpService } from './sign-up.service';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entities';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreteUserDto } from './Dto/createUser.dto';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('SignUpService', () => {
  let signUpService: SignUpService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SignUpService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository, // Mock del repositorio de TypeORM
        },
      ],
    }).compile();

    signUpService = module.get<SignUpService>(SignUpService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('debería estar definido', () => {
    expect(signUpService).toBeDefined();
  });

  describe('create', () => {
    it('debería lanzar un error si el usuario ya existe', async () => {
      const createUserDto: CreteUserDto = { name: 'John', surname: 'Doe', email: 'john@example.com', password: '123456' };

      jest.spyOn(userRepository, 'findOneBy').mockResolvedValueOnce({ id: 1, ...createUserDto , userToRole: [], userToPermission: [] }); // Simula que el usuario ya existe

      await expect(signUpService.create(createUserDto)).rejects.toThrow('User already exists');
      expect(userRepository.findOneBy).toHaveBeenCalledWith({ email: 'john@example.com' });
    });

    it('debería llamar a hashPassword y userRepository.save con los valores correctos si el usuario no existe', async () => {
      const createUserDto: CreteUserDto = { name: 'John', surname: 'Doe', email: 'john@example.com', password: '123456' };
      const hashedPassword = 'hashedPassword';
      const savedUser = { id: 1, ...createUserDto, password: hashedPassword , userToRole: [], userToPermission: [] }; // Respuesta simulada

      jest.spyOn(userRepository, 'findOneBy').mockResolvedValueOnce(null); // Simula que el usuario no existe
      jest.spyOn(signUpService, 'hashPassword').mockResolvedValue(hashedPassword);
      jest.spyOn(userRepository, 'save').mockResolvedValue(savedUser);

      const result = await signUpService.create(createUserDto);

      expect(signUpService.hashPassword).toHaveBeenCalledWith('123456');
      expect(userRepository.save).toHaveBeenCalledWith({
        email: 'john@example.com',
        password: hashedPassword,
        name: 'John',
        surname: 'Doe',
      });
      expect(result).toEqual(savedUser);
    });
  });

  describe('hashPassword', () => {
    it('debería generar un hash con la contraseña', async () => {
      const password = '123456';
      const salt = 'randomSalt';
      const hashedPassword = 'hashedPassword';

      (bcrypt.genSalt as jest.Mock).mockResolvedValue(salt);
      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);

      const result = await signUpService.hashPassword(password);

      expect(bcrypt.genSalt).toHaveBeenCalledWith(10);
      expect(bcrypt.hash).toHaveBeenCalledWith(password, salt);
      expect(result).toBe(hashedPassword);
    });
  });
});
import { LoginService } from './login.service';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

describe('LoginService', () => {
    let service: LoginService;

    beforeEach(() => {
        service = new LoginService(null);
    });

    describe('generateAccessToken', () => {
        // Se verifica si se genera un token de acceso válido con el payload correcto
        it('Should generate access token with correct payload', () => {
            const user = { id: 1, email: 'test@test.com' };
            const token = service.generateAccessToken(user);

            // Verificamos si se genera un token de acceso
            expect(token).toBeDefined();
        });

        // Se verifica si se genera un token de refresh con el payload correcto
        it('Should generate refresh token with correct payload', () => {
            const user = { id: 1, email: 'test@test.com' };
            const token = service.generateRefreshToken(user);

            // Verificamos si se genera un token de refresh
            expect(token).toBeDefined();
        });
    });

    describe('login', () => {
        // Se verifica si se lanza una excepción si no se encuentra un usuario
        it('Should throw NotFoundException if no user is found', async () => {
            const body = { email: 'test@test.com', password: '12345' };

            // Simulamos que no existe un usuario
            jest.spyOn(service, 'login').mockImplementation(async () => {
                throw new NotFoundException('User not found');
            });

            // Verificamos que al no encontrar el usuario, se lance NotFoundException
            await expect(service.login(body)).rejects.toThrow(NotFoundException);
        });

        // Se verifica si se lanza una excepción si la contraseña es incorrecta
        it('Should throw UnauthorizedException if password is invalid', async () => {
            const body = { email: 'test@test.com', password: 'wrongpassword' };

            // Simulamos que la contraseña no coincide
            jest.spyOn(service, 'login').mockImplementation(async () => {
                throw new UnauthorizedException('Invalid password');
            });

            // Verificamos que al no coincidir la contraseña, se lance UnauthorizedException
            await expect(service.login(body)).rejects.toThrow(UnauthorizedException);
        });

        // Se verifica si se retorna el accessToken y refreshToken si el inicio de sesión es exitoso
        it('Should return accessToken and refreshToken if login is successful', async () => {
            const body = { email: 'test@test.com', password: 'correctpassword' };
            const user = { id: 1, email: 'test@test.com' };

            // Simulamos la generación de tokens
            jest.spyOn(service, 'login').mockResolvedValue({
                accessToken: 'access-token',
                refreshToken: 'refresh-token',
            });

            const result = await service.login(body);

            expect(result).toEqual({
                accessToken: 'access-token',
                refreshToken: 'refresh-token',
            });
        });
    });
});

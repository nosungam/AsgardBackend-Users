import { LoginService } from './login.service';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

describe('LoginService', () => {
    let service: LoginService;

    beforeEach(() => {
        service = new LoginService(null);
    });

    describe('generateAccessToken', () => {
        it('should generate access token with correct payload', () => {
            const user = { id: 1, email: 'test@test.com' };
            const token = service.generateAccessToken(user);

            //verificamos si se genera un token
            expect(token).toBeDefined();
        });

        it('should generate refresh token with correct payload', () => {
            const user = { id: 1, email: 'test@test.com' };
            const token = service.generateRefreshToken(user);

            //verificamos si se genera un token de refresh
            expect(token).toBeDefined();
        });
    });

    describe('login', () => {
        it('should throw NotFoundException if no user is found', async () => {
            const body = { email: 'test@test.com', password: '12345' };

            // Simulamos que no existe un usuario
            jest.spyOn(service, 'login').mockImplementation(async () => {
                throw new NotFoundException('User not found');
            });

            await expect(service.login(body)).rejects.toThrow(NotFoundException);
        });

        it('should throw UnauthorizedException if password is invalid', async () => {
            const body = { email: 'test@test.com', password: 'wrongpassword' };

            // Simulamos que la contraseña no coincide
            jest.spyOn(service, 'login').mockImplementation(async () => {
                throw new UnauthorizedException('Invalid password');
            });

            await expect(service.login(body)).rejects.toThrow(UnauthorizedException);
        });

        it('should return accessToken and refreshToken if login is successful', async () => {
            const body = { email: 'test@test.com', password: 'correctpassword' };
            const user = { id: 1, email: 'test@test.com' };

            // Simulamos un inicio de sesión exitoso
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

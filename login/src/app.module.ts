import { Module } from '@nestjs/common';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';
import { UsersModule } from './users/users.module';
import { LoginModule } from './login/login.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { SignUpModule } from './sign-up/sign-up.module';
import { RecoverPasswordModule } from './recover-password/recover-password.module';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5431,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [__dirname + '/**/*.entities{.ts,.js}'],
      synchronize: true
    }),
    ConfigModule.forRoot({
      isGlobal: true}),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      },
      defaults: {
        from: '"Support" <no-reply@asgard.com>',
      },
    }),
    RolesModule,
    PermissionsModule,
    UsersModule,
    LoginModule,
    RecoverPasswordModule,
    AuthModule,
    SignUpModule,
    RecoverPasswordModule],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';
import { UsersModule } from './users/users.module';
import { LoginModule } from './login/login.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { SignUpModule } from './sign-up/sign-up.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'usuarios',
      entities: [__dirname + '/**/*.entities{.ts,.js}'],
      synchronize: true
    }),
    RolesModule,
    PermissionsModule,
    UsersModule,
    LoginModule,
    AuthModule,
    SignUpModule],
})
export class AppModule {}

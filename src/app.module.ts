import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSource } from './database/datasource';
import { User } from './User/user.entity';
import { UserController } from './User/user.controller';
import { UserService } from './User/user.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ConfiguracionMensajeModule } from './configuracion-mensaje/configuracion-mensaje.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSource.options),
    TypeOrmModule.forFeature([User]),
    AuthModule,
    ConfigModule.forRoot({
      isGlobal : true,
    }),
    ConfiguracionMensajeModule
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}

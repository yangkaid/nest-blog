import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserPeople } from './entity/userpeople.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
  imports: [
    TypeOrmModule.forFeature([UserPeople]),
    JwtModule.register({
      secret: 'yanglai', //密钥
      signOptions: { expiresIn: '120s' }, // tkoen的过期时间
    }),
  ],
})
export class UserModule {}

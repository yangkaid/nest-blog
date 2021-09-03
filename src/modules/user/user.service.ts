import { NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { encryptPassword, makeSalt } from 'src/utils/cryptogram.util';
import { Repository } from 'typeorm';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { UserPeople } from './entity/userpeople.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserPeople)
    private readonly userRepository: Repository<UserPeople>,
    private readonly jwtService: JwtService,
  ) {}

  async checkRegisterForm(registerDTO: RegisterDTO): Promise<any> {
    if (registerDTO.password !== registerDTO.passwordRepeat) {
      throw new NotFoundException('两侧输入的密码不一样，请检查');
    }
    const { mobile } = registerDTO;
    const hasUser = await this.userRepository
      .createQueryBuilder('user')
      .where('user.mobile = :mobile', { mobile })
      .getOne();
    if (hasUser) {
      throw new NotFoundException('用户已存在');
    }
  }
  async register(registerDTO: RegisterDTO): Promise<any> {
    await this.checkRegisterForm(registerDTO);
    const { nickname, password, mobile } = registerDTO;
    const salt = makeSalt();
    const hashPassword = encryptPassword(password, salt);
    const newUser: UserPeople = new UserPeople();
    newUser.nickname = nickname;
    newUser.mobile = mobile;
    newUser.password = hashPassword;
    newUser.salt = salt;
    return await this.userRepository.save(newUser);
  }

  // 登陆校验用户信息
  async checkLoginForm(loginDTO: LoginDTO): Promise<any> {
    const { mobile, password } = loginDTO;
    const user = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.salt')
      .addSelect('user.password')
      .where('user.mobile = :mobile', { mobile })
      .getOne();

    if (!user) {
      throw new NotFoundException('用户不存在');
    }
    const { password: dbPassword, salt } = user;
    const currentHashPassword = encryptPassword(password, salt);
    if (currentHashPassword !== dbPassword) {
      throw new NotFoundException('密码错误');
    }

    return user;
  }

  //生成token
  async certificate(user: UserPeople) {
    const payload = {
      id: user.id,
      nickname: user.nickname,
      mobile: user.mobile,
    };
    const token = this.jwtService.sign(payload);
    return token;
  }

  async login(loginDTO: LoginDTO): Promise<any> {
    const user = await this.checkLoginForm(loginDTO);
    const token = await this.certificate(user);
    return {
      info: {
        token,
      },
    };
  }
}

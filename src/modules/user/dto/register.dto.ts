import { ApiProperty } from '@nestjs/swagger';
import { isNotEmpty, isString, Matches } from 'class-validator';
import { regMobile } from 'src/utils/regex.util';

export class RegisterDTO {
  @ApiProperty({
    description: '手机号，唯一',
    example: '17513363195',
  })
  @Matches(regMobile, { message: '请输入正确的手机号' })
  //@isNotEmpty({ message: '请输入手机号' })
  readonly mobile: string;

  @ApiProperty({
    description: '用户名',
    example: '一个无聊的人',
  })
  //@isNotEmpty({ message: '请输入用户昵称' })
  //@isString({ message: '名字必须是string类型的' })
  readonly nickname: string;

  @ApiProperty({
    description: '用户密码',
    example: '123456',
  })
  //@isNotEmpty({ message: '请输入密码' })
  readonly password: string;

  @ApiProperty({
    description: '二次输入密码',
    example: '123456',
  })
  //@isNotEmpty({ message: '请再次输入密码' })
  readonly passwordRepeat: string;
}

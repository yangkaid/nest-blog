import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, Matches } from 'class-validator';
import { regPositive } from 'src/utils/regex.util';

export class ArticleEditDTO {
  //@Matches(regPositive, { message: '请输入有效的id' })
  @ApiProperty({
    description: '文章的id号',
    example: 1,
  })
  @IsNotEmpty({ message: 'id不能为空' })
  readonly id: number;
  @ApiProperty({
    description: '文章标题',
    example: '文章标题',
    required: false,
  })
  @IsOptional()
  readonly title: string;
  @ApiProperty({
    description: '文章描述',
    example: '文章描述',
    required: false,
  })
  @IsOptional()
  readonly description: string;
  @ApiProperty({
    description: '文章内容',
    example: '文章内容',
    required: false,
  })
  @IsOptional()
  readonly content: string;
}

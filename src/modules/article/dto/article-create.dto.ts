import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ArticleCreateDTO {
  @ApiProperty({
    description: '文章标题',
    example: '啊！美丽的大海',
  })
  @IsNotEmpty({ message: '请输入文章的标题' })
  readonly title: string;
  @ApiProperty({
    description: '文章描述',
    example: '文章描述',
  })
  @IsNotEmpty({ message: '请输入文章描述' })
  readonly description: string;
  @ApiProperty({
    description: '文章内容',
    example: '文章内容',
  })
  @IsNotEmpty({ message: '请输入文章的内容' })
  readonly content: string;
}

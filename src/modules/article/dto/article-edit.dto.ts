import { IsNotEmpty, Matches } from 'class-validator';
import { regPositive } from 'src/utils/regex.util';

export class ArticleEditDTO {
  @Matches(regPositive, { message: '请输入有效的id' })
  readonly id: number;
  @IsNotEmpty({ message: 'id不能为空' })
  readonly title: string;
  readonly description: string;
  readonly content: string;
}

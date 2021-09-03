import { IsNotEmpty } from 'class-validator';
export class PictureDTO {
  @IsNotEmpty({ message: '请输入图片的路径' })
  readonly src: string;
}

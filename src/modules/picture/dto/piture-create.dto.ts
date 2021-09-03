import { PictureDTO } from './picture.dto';

export class PictureCreateDTO extends PictureDTO {
  readonly sign?: string;
}

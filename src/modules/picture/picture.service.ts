import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageDTO } from 'src/common/dto/Page.dto';
import { getPagination } from 'src/utils/index.util';
import { Repository } from 'typeorm';
import { PictureCreateDto } from './dto/picture-create';
import { Picture } from './entity/picture.entity';
import * as fs from 'fs';
import { encryptFileMD5 } from 'src/utils/cryptogram.util';
import { uploadStaticSrc } from 'src/config/upload/upload.config';

@Injectable()
export class PictureService {
  constructor(
    @InjectRepository(Picture)
    private readonly pictureRepository: Repository<Picture>,
  ) {}
}

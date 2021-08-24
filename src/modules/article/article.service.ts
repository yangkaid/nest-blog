import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'rxjs';
import { Repository } from 'typeorm';
import { ArticleCreateDTO } from './dto/article-create.dto';
import { ArticleEditDTO } from './dto/article-edit.dto';
import { IdDTO } from './dto/id.dto';
import { ListDTO } from './dto/list.dto';
import { Article } from './entity/article.entity';
@Injectable()
export class ArticleService {
  list: any[];
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {
    this.list = [];
  }
  //获取列表
  async getMore(listDTO: ListDTO) {
    const { page = 1, pageSize = 10 } = listDTO;
    const getList = this.articleRepository
      .createQueryBuilder('article')
      .where({ isDelete: false })
      .select([
        'article.id',
        'article.title',
        'article.description',
        'article.createTime',
        'article.updateTime',
      ])
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getMany();

    const list = await getList;
    return list;
  }

  //获取单条文章
  async getOne(idDto: IdDTO) {
    const { id } = idDto;
    const articleDetail = await this.articleRepository
      .createQueryBuilder('article')
      .where('article.id = :id', { id })
      .getOne();
    if (!articleDetail) {
      throw new NotFoundException('找不到文章');
    }
    const result = {
      info: articleDetail,
    };
    return result;
  }

  //创建文章
  async create(articleCreateDTO: ArticleCreateDTO): Promise<Article> {
    const article = new Article();
    article.title = articleCreateDTO.title;
    article.description = articleCreateDTO.description;
    article.content = articleCreateDTO.content;
    const result = await this.articleRepository.save(article);
    return result;
  }

  //更新文章
  async update(articleEditDTO: ArticleEditDTO): Promise<Article> {
    const { id } = articleEditDTO;
    const articleToUpdate = await this.articleRepository.findOne({ id });
    articleToUpdate.title = articleEditDTO.title;
    articleToUpdate.description = articleEditDTO.description;
    articleToUpdate.content = articleEditDTO.content;
    const result = await this.articleRepository.save(articleToUpdate);
    return result;
  }

  // 删除文章
  async delete(idDto: IdDTO) {
    const { id } = idDto;
    const articleToUpdate = await this.articleRepository.findOne({ id });
    articleToUpdate.isDelete = true;
    const result = await this.articleRepository.save(articleToUpdate);
    return result;
  }
}

import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ArticleService } from './article.service';
import { ArticleCreateDTO } from './dto/article-create.dto';
import { ArticleEditDTO } from './dto/article-edit.dto';
import { IdDTO } from './dto/id.dto';
import { ListDTO } from './dto/list.dto';
import { ArticleInfoResponse } from './vo/article-info.vo';
import { ArticleListResponse } from './vo/article-list.vo';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('文章模块')
@Controller('article')
export class ArticleController {
  constructor(private articleService: ArticleService) {}
  @Get('list')
  @ApiOkResponse({ description: '文章列表', type: ArticleListResponse })
  getMore(@Query() listDTO: ListDTO) {
    return this.articleService.getMore(listDTO);
  }

  @Get('info')
  @ApiOkResponse({ description: '文章详情', type: ArticleInfoResponse })
  getOne(@Query() idDTO: IdDTO) {
    return this.articleService.getOne(idDTO);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  @ApiOkResponse({ description: '创建文章', type: ArticleInfoResponse })
  @ApiBearerAuth()
  create(@Body() articleCreateDTO: ArticleCreateDTO) {
    return this.articleService.create(articleCreateDTO);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('edit')
  @ApiOkResponse({ description: '编辑文章', type: ArticleInfoResponse })
  @ApiBearerAuth()
  update(@Body() articleEditDTO: ArticleEditDTO) {
    return this.articleService.update(articleEditDTO);
  }

  //@UseGuards(AuthGuard('jwt'))
  @Post('delete')
  @ApiOkResponse({ description: '删除文章', type: ArticleInfoResponse })
  //@ApiBearerAuth()
  delete(@Body() idDto: IdDTO) {
    return this.articleService.delete(idDto);
  }
}

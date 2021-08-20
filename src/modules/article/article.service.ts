import { Injectable } from '@nestjs/common';
import { Article } from './interface/article.interface';

@Injectable()
export class ArticleService {
  list: any[];
  constructor() {
    this.list = [];
  }
  //获取列表
  getMore() {
    return this.list.filter((item) => !item.isDelete);
  }

  //获取单条文章
  getOne({ id }) {
    const item = this.list.filter((item) => {
      return (item.id = id);
    })[0];
    if (item) {
      return item;
    }
    return '找不到文章';
  }

  //创建文章
  create(article: Article) {
    const id = this.list.length;
    const item = {
      id,
      ...article,
    };
    this.list.push(item);
    console.log(this.list);
  }

  //更新文章
  update(article: Article) {
    let idx = 0;
    const item = this.list.filter((item, index) => {
      if (item.id === article.id) {
        idx = index;
      }
      return item.id === article.id;
    });
    if (!item) {
      return '找不到这篇文章';
    }
    const newItem = {
      ...item,
      ...article,
    };
    this.list.splice(idx, 1, newItem);
  }

  // 删除文章
  delete({ id }) {
    let idx = 0;
    const item = this.list.filter((item, i) => {
      if (item.id === id) {
        idx = i;
      }
      return item.id === id;
    });
    if (!item) {
      return '找不到文章';
    }
    const nItem = {
      ...item,
      isDelete: true,
    };
    this.list.splice(idx, 1, nItem);
  }
}

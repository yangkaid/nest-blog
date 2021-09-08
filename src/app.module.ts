import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './modules/article/article.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { PictureModule } from './modules/picture/picture.module';
import { PictureController } from './modules/picture/picture.controller';
import { PictureService } from './modules/picture/picture.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'yangkai',
      database: 'test',
      entities: ['dist/modules/**/*.entity{.ts,.js}'],
      synchronize: true, //设置synchronize可确保每次运行应用程序时实体都将与数据库同步。
    }),
    ArticleModule,
    UserModule,
    PictureModule,
  ],
})
export class AppModule {}

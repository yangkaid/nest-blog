import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './server/user/user.module';
import { ProjectModule } from './server/project/project.module';
import { ErrorModule } from './run/error/error.module';

@Module({
  imports: [UserModule, ProjectModule, ErrorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

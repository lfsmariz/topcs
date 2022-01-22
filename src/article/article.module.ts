import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { RestClientService } from 'src/restclient/restclient.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ArticleController],
  providers: [ArticleService, PrismaService, RestClientService],
})
export class ArticleModule {}

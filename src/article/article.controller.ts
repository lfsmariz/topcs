import { Body, Controller, Put, Get, Param } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ReadArticleRequestDto } from './dto/article-request.dto';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Put('read')
  async create(@Body() dataArticle: ReadArticleRequestDto): Promise<any> {
    return this.articleService.readArticle(dataArticle);
  }

  @Get('article')
  async getArticle(
    @Param('idPlayer') idPlayer: number,
    @Param('idTopic') idTopic: number,
  ): Promise<any> {
    return this.articleService.getArticle(idPlayer, idTopic);
  }

}

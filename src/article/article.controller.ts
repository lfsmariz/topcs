import { Body, Controller, Put } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ReadArticleRequestDto } from './dto/article-request.dto';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Put('read')
  async read(@Body() dataArticle: ReadArticleRequestDto): Promise<any> {
    return this.articleService.readArticle(dataArticle);
  }
}

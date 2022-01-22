import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { RestClientService } from 'src/restclient/restclient.service';
import { ReadArticleRequestDto } from './dto/article-request.dto';

@Injectable()
export class ArticleService {
    constructor(
        private prismaService: PrismaService,
        private restClientService: RestClientService,
    ) {}

    async readArticle(dataArticle: ReadArticleRequestDto): Promise<any> {
        return dataArticle;
    }

}

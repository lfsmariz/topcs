import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TopicModule } from './topic/topic.module';
import { ArticleModule } from './article/article.module';
import { PlayerModule } from './player/player.module';

@Module({
  imports: [TopicModule, ArticleModule, PlayerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

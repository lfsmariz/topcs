import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreatePlayerResponseDto } from './dto/create-player-response.dto';
import { CreatePlayerRequestDto } from './dto/create-player-request.dto';

@Injectable()
export class PlayerService {
  constructor(private prismaService: PrismaService) {}

  async createPlayer(
    playerInput: CreatePlayerRequestDto,
  ): Promise<CreatePlayerResponseDto> {
    const nowDate = new Date(Date.now());
    const nPlayer: Prisma.PlayerCreateInput = {
      ...playerInput,
      createdAt: nowDate,
      updatedAt: nowDate,
      deleted: false,
    };
    const savedPlayer = await this.prismaService.player.create({
      data: {
        playerTopics: {
          create: [],
        },
        playerArticles: {
          create: [],
        },
        ...nPlayer,
      },
    });

    const savedTopics = await this.prismaService.topic.findMany({
      where: {
        playerTopics: {
          some: { playerId: savedPlayer.id },
        },
      },
    });

    const savedArticle = await this.prismaService.article.findMany({
      where: {
        playerArticles: {
          some: { playerId: savedPlayer.id },
        },
      },
    });
    return new CreatePlayerResponseDto(savedPlayer, savedTopics, savedArticle);
  }
}

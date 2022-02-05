import { Player, Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import {
  FullPlayerResponseDto,
  GetArticlesFromPlayerResponseDto,
  GetScoreResponseDto,
} from './dto/player-response.dto';
import {
  CreatePlayerRequestDto,
  LoginPlayerRequestDto,
} from './dto/player-request.dto';
import { PrismaService } from '../prisma.service';

type PlayerContentQueryResult = Player;

@Injectable()
export class PlayerService {
  constructor(private prismaService: PrismaService) {}

  async createPlayer(
    playerInput: CreatePlayerRequestDto,
  ): Promise<FullPlayerResponseDto> {
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
      include: {
        playerTopics: {
          include: {
            topic: true,
          },
        },
        playerArticles: {
          include: {
            article: true,
          },
        },
      },
    });

    return new FullPlayerResponseDto(savedPlayer);
  }

  async loginPlayer(
    playerInput: LoginPlayerRequestDto,
  ): Promise<FullPlayerResponseDto> {
    const playerContent = await this.prismaService.player.findUnique({
      where: {
        username: playerInput.username,
      },
    });

    this.validatePlayer(playerContent, playerInput.password);

    return new FullPlayerResponseDto(playerContent);
  }

  async getArticlesFromPlayer(idPlayer: number): Promise<any> {
    const articles = await this.prismaService.article.findMany({
      where: {
        playerArticles: {
          every: {
            playerId: Number(idPlayer),
          },
        },
      },
      include: {
        playerArticles: true,
        topic: true,
      },
    });

    return new GetArticlesFromPlayerResponseDto(articles);
  }

  async getScore(player: string): Promise<GetScoreResponseDto> {
    const playerTopics = await this.prismaService.playersTopics.findMany({
      orderBy: {
        points: 'desc',
      },
      take: 10,
      include: {
        topic: {
          select: {
            topicName: true,
          },
        },
      },
      where: {
        player: {
          username: player,
        },
      },
    });

    return new GetScoreResponseDto(playerTopics);
  }

  private validatePlayer(player: PlayerContentQueryResult, pass: string) {
    if (player === null || player.password !== pass) {
      throw new Error('usuário ou senha incorreta');
    }
  }
}

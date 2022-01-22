import {
  Article,
  Player,
  PlayersArticles,
  PlayersTopics,
  Prisma,
  Topic,
} from '@prisma/client';
import { Injectable } from '@nestjs/common';
import {
  FullPlayerResponseDto,
  GetScoreResponseDto,
} from './dto/player-response.dto';
import {
  CreatePlayerRequestDto,
  LoginPlayerRequestDto,
} from './dto/player-request.dto';
import { PrismaService } from '../prisma.service';

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
    const player = await this.prismaService.player.findUnique({
      where: {
        username: playerInput.username,
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

    this.validatePlayer(player, playerInput.password);

    return new FullPlayerResponseDto(player);
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

  private validatePlayer(
    player: Player & {
      playerTopics: (PlayersTopics & {
        topic: Topic;
      })[];
      playerArticles: (PlayersArticles & {
        article: Article;
      })[];
    },
    pass: string,
  ) {
    if (player === null || player.password !== pass) {
      throw new Error('usuário ou senha incorreta');
    }
  }
}

import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { PlayerService } from './player.service';
import {
  CreatePlayerRequestDto,
  LoginPlayerRequestDto,
} from './dto/player-request.dto';
import {
  FullPlayerResponseDto,
  GetScoreResponseDto,
} from './dto/player-response.dto';

@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Post('create')
  async create(
    @Body() createPlayerDto: CreatePlayerRequestDto,
  ): Promise<FullPlayerResponseDto> {
    return this.playerService.createPlayer(createPlayerDto);
  }

  @Post('login')
  async login(
    @Body() loginPlayerReqDto: LoginPlayerRequestDto,
  ): Promise<FullPlayerResponseDto> {
    return this.playerService.loginPlayer(loginPlayerReqDto);
  }

  @Get(':idPlayer/articles')
  async getArticlesFromPlayer(
    @Param('idPlayer') idPlayer: number,
  ): Promise<any> {
    return this.playerService.getArticlesFromPlayer(idPlayer);
  }

  @Get('score/:player')
  async getScore(
    @Param('player') player: string,
  ): Promise<GetScoreResponseDto> {
    return this.playerService.getScore(player);
  }
}

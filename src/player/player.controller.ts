import { Controller, Post, Body } from '@nestjs/common';
import { PlayerService } from './player.service';
import {
  CreatePlayerRequestDto,
  LoginPlayerRequestDto,
} from './dto/player-request.dto';
import { FullPlayerResponseDto } from './dto/player-response.dto';

@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Post()
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
}

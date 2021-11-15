import { Controller, Post, Body } from '@nestjs/common';
import { PlayerService } from './player.service';
import { CreatePlayerRequestDto } from './dto/create-player-request.dto';
import { CreatePlayerResponseDto } from './dto/create-player-response.dto';

@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Post()
  async create(
    @Body() createPlayerDto: CreatePlayerRequestDto,
  ): Promise<CreatePlayerResponseDto> {
    return this.playerService.createPlayer(createPlayerDto);
  }
}

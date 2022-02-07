import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma.service';
import { CreatePlayerRequestDto } from './dto/player-request.dto';
import { FullPlayerResponseDto } from './dto/player-response.dto';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';

describe('PlayerController', () => {
  let controller: PlayerController;
  let playerService: PlayerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlayerController],
      providers: [PlayerService, PrismaService],
    }).compile();
    playerService = module.get<PlayerService>(PlayerService);
    controller = module.get<PlayerController>(PlayerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    // Arrange
    const player = {
      id: 1,
      username: 'string',
      email: 'string',
      createdAt: new Date(1000),
      deleted: false,
    };
    const inputPlayer = new CreatePlayerRequestDto();
    const outputPlayer = {
      id: 1,
      username: 'string',
      email: 'string',
      createdAt: new Date(1000),
      deleted: false,
    };

    //Act
    jest
      .spyOn(playerService, 'createPlayer')
      .mockImplementation(
        () => player as unknown as Promise<FullPlayerResponseDto>,
      );

    const expected = controller.create(inputPlayer);
    //Assert
    await expect(expected).resolves.toEqual(outputPlayer);
  });

  it('should login a user', async () => {
    // Arrange
    const player = {
      id: 1,
      username: 'string',
      email: 'string',
      createdAt: new Date(1000),
      deleted: false,
    };
    const inputPlayer = new CreatePlayerRequestDto();
    const outputPlayer = {
      id: 1,
      username: 'string',
      email: 'string',
      createdAt: new Date(1000),
      deleted: false,
    };

    //Act
    jest
      .spyOn(playerService, 'loginPlayer')
      .mockImplementation(
        () => player as unknown as Promise<FullPlayerResponseDto>,
      );

    const expected = controller.login(inputPlayer);
    //Assert
    await expect(expected).resolves.toEqual(outputPlayer);
  });
});

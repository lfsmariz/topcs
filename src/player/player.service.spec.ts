import { Player, Prisma } from '.prisma/client';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma.service';
import {
  CreatePlayerRequestDto,
  LoginPlayerRequestDto,
} from './dto/player-request.dto';
import { PlayerService } from './player.service';

describe('PlayerService', () => {
  let service: PlayerService;
  let prisma: PrismaService;
  jest.mock('../prisma.service.ts');

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlayerService, PrismaService],
    }).compile();

    service = module.get<PlayerService>(PlayerService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    // Arrange
    const player = {
      id: 1,
      username: 'string',
      email: 'string',
      password: 'string',
      createdAt: new Date(1000),
      updatedAt: new Date(1000),
      deleted: false,
    };
    const inputPlayer = new CreatePlayerRequestDto();
    const outputPlayer = {
      createdAt: new Date(1000),
      email: 'string',
      username: 'string',
    };

    //Act
    jest
      .spyOn(prisma.player, 'create')
      .mockImplementation(
        () => player as unknown as Prisma.Prisma__PlayerClient<Player>,
      );

    //Assert
    await expect(service.createPlayer(inputPlayer)).resolves.toEqual(
      outputPlayer,
    );
  });

  it('should login a user', async () => {
    // Arrange
    const player = {
      id: 1,
      username: 'string',
      email: 'string',
      password: 'string',
      createdAt: new Date(1000),
      updatedAt: new Date(1000),
      deleted: false,
    };

    const inputPlayer = new LoginPlayerRequestDto();
    const outputPlayer = {
      createdAt: new Date(1000),
      email: 'string',
      username: 'string',
    };

    inputPlayer.password = 'string';

    jest
      .spyOn(prisma.player, 'findUnique')
      .mockImplementation(
        () => player as unknown as Prisma.Prisma__PlayerClient<Player>,
      );

    const expected = service.loginPlayer(inputPlayer);
    //Assert
    await expect(expected).resolves.toEqual(outputPlayer);
  });

  it('should not login a user', async () => {
    // Arrange
    const player = {
      id: 1,
      username: 'string',
      email: 'string',
      password: 'string',
      createdAt: new Date(1000),
      updatedAt: new Date(1000),
      deleted: false,
    };
    const inputPlayer = new LoginPlayerRequestDto();
    const outputError = new Error('usuário ou senha incorreta');

    inputPlayer.password = 'strin';

    jest
      .spyOn(prisma.player, 'findUnique')
      .mockImplementation(
        () => player as unknown as Prisma.Prisma__PlayerClient<Player>,
      );

    const expected = service.loginPlayer(inputPlayer);
    //Assert
    await expect(expected).rejects.toEqual(outputError);
  });
});

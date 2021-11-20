export class CreatePlayerRequestDto {
  username: string;
  password: string;
  email: string;
}

export class LoginPlayerRequestDto {
  password: string;
  username: string;
}

import { Module } from '@nestjs/common';
import { RestClientService } from './restclient.service';

@Module({
  providers: [RestClientService],
})
export class RestClientModule {}

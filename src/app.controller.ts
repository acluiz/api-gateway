import { Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('gestao/evento')
  sendManagementEvent() {
    this.appService.sendManagementEvent();
  }

  @Post('planos-ativos/evento')
  sendActivePlansEvent() {
    this.appService.sendActivePlansEvent();
  }
}

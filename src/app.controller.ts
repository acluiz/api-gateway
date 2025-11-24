import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

import type { IPagamento } from './models';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('planos/ativos')
  async getActivePlans() {
    return await this.appService.getActivePlans();
  }

  @Post('pagamento/evento')
  sendManagementEvent(@Body() payment: IPagamento) {
    this.appService.sendManagementEvent(payment);
    this.appService.sendActivePlansEvent(payment);
  }
}

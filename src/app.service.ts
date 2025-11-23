import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { IPagamento } from './models';

@Injectable()
export class AppService {
  constructor(
    @Inject('SERVICO_GESTAO')
    private readonly managementClient: ClientProxy,
    @Inject('SERVICO_PLANOS_ATIVOS')
    private readonly activePlansClient: ClientProxy,
  ) {}

  sendManagementEvent(payment: IPagamento) {
    this.managementClient.emit('PagamentoPlanoServicoGestao', {
      ...payment,
      timestamp: new Date(),
    });
  }

  sendActivePlansEvent(payment: IPagamento) {
    this.activePlansClient.emit('PagamentoPlanoServicoPlanosAtivos', {
      ...payment,
      timestamp: new Date(),
    });
  }
}

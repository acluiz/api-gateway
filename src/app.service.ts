import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

import { IPagamento } from './models';

@Injectable()
export class AppService {
  constructor(
    private http: HttpService,
    @Inject('SERVICO_GESTAO')
    private readonly managementClient: ClientProxy,
    @Inject('SERVICO_PLANOS_ATIVOS')
    private readonly activePlansClient: ClientProxy,
  ) {}

  async getActivePlans() {
    const baseUrl = process.env.MANAGEMENT_API_BASE_URL || '';

    const response = await lastValueFrom(
      this.http.get(`${baseUrl}/gestao/assinaturas/ativos`),
    );

    return response.data;
  }

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

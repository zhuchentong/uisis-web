import { NetService } from '@core/http';
import { Observable } from 'rxjs';
import { operatorController } from 'app/config/service/operator.controller';
import { Injectable } from '@angular/core';

@Injectable()
export class OperatorService {
  constructor(private net: NetService) {}

  /**
   * 用户登陆
   */
  public login(params): Observable<any> {
    return this.net.send({
      service: operatorController.login,
      params
    });
  }
}

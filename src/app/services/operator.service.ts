import { NetService } from '@core/http'
import { Observable } from 'rxjs'
import { operatorController } from 'app/config/service/operator.controller'
import { Injectable } from '@angular/core'
import { UserModel } from 'app/model/user.model'

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
    })
  }

  public createOperator(params): Observable<any> {
    return this.net.send({
      service: operatorController.createOperator,
      params
    })
  }

  public getOperators(page): Observable<UserModel> {
    return this.net.send({
      service: operatorController.getOperators,
      page,
      model: UserModel
    })
  }

  public updateOperator(params): Observable<any> {
    return this.net.send({
      service: operatorController.updateOperator,
      params
    })
  }
}

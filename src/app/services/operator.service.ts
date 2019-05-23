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

  public createOperator(params): Observable<UserModel> {
    return this.net.send({
      service: operatorController.createOperator,
      params,
      model: UserModel
    })
  }

  public getOperators(params, { page }): Observable<UserModel[]> {
    console.log(params)
    return this.net.send({
      service: operatorController.getOperators,
      params,
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

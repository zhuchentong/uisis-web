import { NetService } from '@core/http'
import { Observable } from 'rxjs'
import { appverController } from 'app/config/service/appver.controller'
import { Injectable } from '@angular/core'
import { AppverModel } from 'app/model/appver.model'

@Injectable()
export class AppverService {
  constructor(private net: NetService) {}

  public createAppver(params): Observable<any> {
    return this.net.send({
      service: appverController.createAppver,
      params
    })
  }

  public getAppvers(page): Observable<AppverModel> {
    return this.net.send({
      service: appverController.getAppvers,
      page,
      model: AppverModel
    })
  }

  public updateAppver(params): Observable<any> {
    return this.net.send({
      service: appverController.updateAppver,
      params
    })
  }
}

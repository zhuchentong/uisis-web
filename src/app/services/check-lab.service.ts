import { NetService } from '@core/http'
import { Observable } from 'rxjs'
import { checkLabController } from 'app/config/service/check-lab.controller'
import { Injectable } from '@angular/core'
import { CheckRecordModel } from 'app/model/check-record.model'
import { CheckRecordContentModel } from 'app/model/check-record-content.model'

@Injectable()
export class CheckLabService {
  constructor(private net: NetService) {}

  public next(params): Observable<any> {
    return this.net.send({
      service: checkLabController.next,
      params
    })
  }

  public queryDanger(params, { page }): Observable<CheckRecordModel> {
    return this.net.send({
      service: checkLabController.queryDanger,
      params,
      page,
      model: CheckRecordModel
    })
  }

  public getRecord(id): Observable<any> {
    return this.net.send({
      service: checkLabController.getRecord,
      append: id
    })
  }
  public getRecordContent(id): Observable<any> {
    return this.net.send({
      service: checkLabController.getRecordContent,
      append: id
    })
  }

  public findRecordContent(id): Observable<any> {
    return this.net.send({
      service: checkLabController.findRecordContent,
      append: id
    })
  }
}

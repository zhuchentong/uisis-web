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

  public queryDanger(page): Observable<CheckRecordModel> {
    return this.net.send({
      service: checkLabController.queryDanger,
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
}

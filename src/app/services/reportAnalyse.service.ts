import { NetService } from '@core/http'
import { Observable } from 'rxjs'
import { reportAnalyseController } from 'app/config/service/reportAnalyse.controller'
import { Injectable } from '@angular/core'
import { ReportAnalyseModel } from 'app/model/reportAnalyse.model'

@Injectable()
export class ReportAnalyseService {
  constructor(private net: NetService) {}

  public getReportAnalyses(page): Observable<ReportAnalyseModel> {
    return this.net.send({
      service: reportAnalyseController.getReportAnalyses,
      page,
      model: ReportAnalyseModel
    })
  }
}

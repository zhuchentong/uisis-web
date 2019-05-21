import { NetService } from '@core/http'
import { Observable } from 'rxjs'
import { laboratoryRiskLevelController } from 'app/config/service/laboratory-risk-level.controller'
import { Injectable } from '@angular/core'
import { LaboratoryRiskLevelModel } from 'app/model/laboratory-risk-level.model'

@Injectable()
export class LaboratoryRiskLevelService {
  constructor(private net: NetService) {}

  public create(params): Observable<any> {
    return this.net.send({
      service: laboratoryRiskLevelController.create,
      params
    })
  }

  public query(page): Observable<LaboratoryRiskLevelModel> {
    return this.net.send({
      service: laboratoryRiskLevelController.query,
      page,
      model: LaboratoryRiskLevelModel
    })
  }

  public modify(params): Observable<any> {
    return this.net.send({
      service: laboratoryRiskLevelController.modify,
      params
    })
  }

  public delete(id): Observable<any> {
    return this.net.send({
      service: laboratoryRiskLevelController.delete,
      append: id
    })
  }

  public findById(id): Observable<any> {
    return this.net.send({
      service: laboratoryRiskLevelController.findById,
      append: id
    })
  }

  public getAll(): Observable<any> {
    return this.net.send({
      service: laboratoryRiskLevelController.getAll
    })
  }
}

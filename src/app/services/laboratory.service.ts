import { NetService } from '@core/http'
import { Observable } from 'rxjs'
import { laboratoryController } from 'app/config/service/laboratory.controller'
import { Injectable } from '@angular/core'
import { LaboratoryModel } from 'app/model/laboratory.model'

@Injectable()
export class LaboratoryService {
  constructor(private net: NetService) {}

  public create(params): Observable<any> {
    return this.net.send({
      service: laboratoryController.create,
      params
    })
  }

  public query(params, { page }): Observable<LaboratoryModel> {
    return this.net.send({
      service: laboratoryController.query,
      params,
      page,
      model: LaboratoryModel
    })
  }

  public modify(params): Observable<any> {
    return this.net.send({
      service: laboratoryController.modify,
      params
    })
  }

  public delete(id): Observable<any> {
    return this.net.send({
      service: laboratoryController.delete,
      append: id
    })
  }

  public findById(id): Observable<any> {
    return this.net.send({
      service: laboratoryController.findById,
      append: id
    })
  }

  public getAll(): Observable<any> {
    return this.net.send({
      service: laboratoryController.getAll
    })
  }

  public findByOrg(id): Observable<any> {
    return this.net.send({
      service: laboratoryController.findByOrg,
      append: [id]
    })
  }
}

import { NetService } from '@core/http'
import { Observable } from 'rxjs'
import { laboratoryTypeController } from 'app/config/service/laboratory-type.controller'
import { Injectable } from '@angular/core'
import { LaboratoryTypeModel } from 'app/model/laboratory-type.model'

@Injectable()
export class LaboratoryTypeService {
  constructor(private net: NetService) {}

  public create(params): Observable<any> {
    return this.net.send({
      service: laboratoryTypeController.create,
      params
    })
  }

  public query(page): Observable<LaboratoryTypeModel> {
    return this.net.send({
      service: laboratoryTypeController.query,
      page,
      model: LaboratoryTypeModel
    })
  }

  public modify(params): Observable<any> {
    return this.net.send({
      service: laboratoryTypeController.modify,
      params,
      model: LaboratoryTypeModel
    })
  }

  public delete(id): Observable<any> {
    return this.net.send({
      service: laboratoryTypeController.delete,
      append: id
    })
  }

  public findById(id): Observable<any> {
    return this.net.send({
      service: laboratoryTypeController.findById,
      append: id
    })
  }

  public getAll(): Observable<any> {
    return this.net.send({
      service: laboratoryTypeController.getAll
    })
  }
}

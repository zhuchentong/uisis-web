import { NetService } from '@core/http'
import { Observable } from 'rxjs'
import { documentController } from 'app/config/service/document.controller'
import { Injectable } from '@angular/core'
import { DocumentModel } from 'app/model/document.model'

@Injectable()
export class DocumentService {
  constructor(private net: NetService) {}

  public create(params): Observable<any> {
    return this.net.send({
      service: documentController.create,
      params
    })
  }

  public query(params, { page }): Observable<DocumentModel> {
    return this.net.send({
      service: documentController.query,
      params,
      page,
      model: DocumentModel
    })
  }

  public modify(params): Observable<any> {
    return this.net.send({
      service: documentController.modify,
      params,
      model: DocumentModel
    })
  }

  public delete(id): Observable<any> {
    return this.net.send({
      service: documentController.delete,
      append: id
    })
  }

  public findById(id): Observable<any> {
    return this.net.send({
      service: documentController.findById,
      append: id
    })
  }

  public getAll(): Observable<any> {
    return this.net.send({
      service: documentController.getAll
    })
  }
}

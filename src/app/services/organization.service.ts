import { NetService } from '@core/http'
import { Observable } from 'rxjs'
import { Injectable } from '@angular/core'
import { organizationController } from 'app/config/service/organization.controller'

@Injectable()
export class OrganizationService {
  constructor(private net: NetService) {}

  /**
   * 创建组织
   */
  public create(params): Observable<any> {
    return this.net.send({
      service: organizationController.create,
      params
    })
  }

  /**
   * 删除组织
   */
  public delete(id): Observable<any> {
    return this.net.send({
      service: organizationController.delete,
      append: id
    })
  }

  /**
   * 获取组织
   */
  public getAll(): Observable<any> {
    return this.net.send({
      service: organizationController.getAll
    })
  }

  /**
   * 修改组织
   */
  public modify(params): Observable<any> {
    return this.net.send({
      service: organizationController.modify,
      params
    })
  }
}

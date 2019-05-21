import { NetService } from '@core/http'
import { Observable } from 'rxjs'
import { Injectable } from '@angular/core'
import { checkItemConfigController } from 'app/config/service/check-item-config.controller'
import { CheckItemModel } from 'app/model/check-item.model'

@Injectable()
export class CheckItemConfigService {
  constructor(private net: NetService) {}

  /**
   * 创建组织
   */
  public create(params): Observable<any> {
    return this.net.send({
      service: checkItemConfigController.create,
      params
    })
  }

  /**
   * 删除组织
   */
  public delete(id): Observable<any> {
    return this.net.send({
      service: checkItemConfigController.delete,
      append: id
    })
  }

  /**
   * 获取组织
   */
  public getAll(): Observable<CheckItemModel[]> {
    return this.net.send({
      service: checkItemConfigController.getAll,
      model: CheckItemModel
    })
  }

  /**
   * 修改组织
   */
  public modify(params): Observable<any> {
    return this.net.send({
      service: checkItemConfigController.modify,
      params
    })
  }

  public findByParentId(parentId): Observable<CheckItemModel[]> {
    return this.net.send({
      service: checkItemConfigController.findByParentId,
      append: [parentId],
      model: CheckItemModel
    })
  }
}

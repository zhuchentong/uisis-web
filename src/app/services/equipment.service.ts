import { NetService } from '@core/http'
import { Observable } from 'rxjs'
import { equipmentController } from 'app/config/service/equipment.controller'
import { Injectable } from '@angular/core'
import { EquipmentModel } from 'app/model/equipment.model'

@Injectable()
export class EquipmentService {
  constructor(private net: NetService) {}

  public createEquipment(params): Observable<any> {
    return this.net.send({
      service: equipmentController.createEquipment,
      params
    })
  }

  public getEquipments(page): Observable<EquipmentModel> {
    return this.net.send({
      service: equipmentController.getEquipments,
      page,
      model: EquipmentModel
    })
  }

  public updateEquipment(params): Observable<any> {
    return this.net.send({
      service: equipmentController.updateEquipment,
      params
    })
  }
}

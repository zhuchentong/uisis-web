import { NetService } from '@core/http'
import { Observable } from 'rxjs'
import { operatorController } from 'app/config/service/operator.controller'
import { Injectable } from '@angular/core'
import { UserModel } from 'app/model/user.model'
import { messageController } from 'app/config/service/message.controller'

@Injectable()
export class MessageService {
  constructor(private net: NetService) {}

  public query(params, { page }): Observable<any> {
    return this.net.send({
      service: messageController.query,
      params,
      page
    })
  }

  public clear(type): Observable<any> {
    return this.net.send({
      service: messageController.clear,
      append: [type]
    })
  }
}

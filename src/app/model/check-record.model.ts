import { Model } from '.'
import { Expose, Type } from 'class-transformer'
import { LaboratoryModel } from './laboratory.model'
import { CheckItemModel } from './check-item.model'
import { UserModel } from './user.model'

export class CheckRecordModel extends Model {
  @Expose()
  public id

  @Expose()
  @Type(() => LaboratoryModel)
  public laboratory: LaboratoryModel

  @Expose()
  @Type(() => CheckItemModel)
  public checkItemConfigSnapshot: CheckItemModel

  @Expose()
  public incompatible: string

  @Expose()
  public remark: string

  @Expose()
  public workFlowId: string

  @Expose()
  public workFlowTaskName: string

  @Expose()
  public checkType: 'START_CHECK' | 'MIDDLE_CHECK' | 'FINAL_CHECK' | 'SPECIAL_CHECK' | 'DAILY_CHECK' | 'SELF_CHECK'

  @Expose()
  // tslint:disable-next-line: max-line-length
  public checkRecordState:
    | 'NO_PROBLEM'
    | 'FOUND_PROBLEM'
    | 'FINAL_CHEPENDING_RECTIFICATIONCK'
    | 'CORRECTION_COMPLETED'
    | 'PENDING_REVIEW'
    | 'REVIEW_PASS'

  @Expose()
  @Type(() => UserModel)
  public creator: UserModel

  @Expose()
  @Type(() => Date)
  public createTime: Date

  @Expose()
  @Type(() => UserModel)
  public updater: UserModel

  @Expose()
  @Type(() => Date)
  public updateTime: Date
}

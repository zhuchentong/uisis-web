import { Model } from '.'
import { Expose } from 'class-transformer'

export class LaboratoryRiskLevelModel extends Model {
  @Expose()
  public id: string
  @Expose()
  public name: string
  @Expose()
  public description: string
  @Expose()
  public monthSelfCheckTimes: number
  @Expose()
  public monthCheckTimes: number
  @Expose()
  public selfCheckEveryDay: boolean
  @Expose()
  public reminderDays: number
  @Expose()
  public checkTypes: string[]
  @Expose()
  public sortNo: number
}

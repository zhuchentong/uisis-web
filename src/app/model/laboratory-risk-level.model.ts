import { Model } from '.'

export class LaboratoryRiskLevelModel extends Model {
  public id: string

  public name: string

  public description: string

  public monthSelfCheckTimes: number

  public monthCheckTimes: number

  public selfCheckEveryDay: boolean

  public reminderDays: number

  public checkTypes: string[]
}

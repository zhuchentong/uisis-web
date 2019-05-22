import { Model } from '.'
import { Expose, Type } from 'class-transformer'
import { LaboratoryRiskLevelModel } from './laboratory-risk-level.model'
import { LaboratoryTypeModel } from './laboratory-type.model'
import { OrganizationModel } from './organization.model'
import { UserModel } from './user.model'

export class LaboratoryModel extends Model {
  @Expose()
  public id: string
  @Expose()
  public name: string
  @Expose()
  public code: string
  @Expose()
  public address: string
  @Expose()
  @Type(() => LaboratoryRiskLevelModel)
  public laboratoryRiskLevel: LaboratoryRiskLevelModel
  @Expose()
  @Type(() => LaboratoryTypeModel)
  public laboratoryType: LaboratoryTypeModel
  @Expose()
  @Type(() => OrganizationModel)
  public organization: OrganizationModel
  @Expose()
  public monthSelfCheckTimes: number
  @Expose()
  public monthCheckTimes: number
  @Expose()
  @Type(() => Date)
  public lastSelfCheckDate: Date
  @Expose()
  @Type(() => Date)
  public lastCheckDate: Date

  @Expose()
  public managers: UserModel[]
}

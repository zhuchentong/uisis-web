import { Model } from '.'
import { Expose, Type, TransformClassToPlain, Transform } from 'class-transformer'
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
  @Transform(value => value.id, { toPlainOnly: true })
  public laboratoryRiskLevel: LaboratoryRiskLevelModel
  @Expose()
  @Type(() => LaboratoryTypeModel)
  @Transform(value => value.id, { toPlainOnly: true })
  public laboratoryType: LaboratoryTypeModel
  @Expose()
  @Type(() => OrganizationModel)
  @Transform(value => value.id, { toPlainOnly: true })
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
  @Type(() => UserModel)
  @Transform(value => value.map(x => x.id), { toPlainOnly: true })
  public managers: UserModel[]
}

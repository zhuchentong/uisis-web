import { Model } from '.'
import { Type, Expose, Transform } from 'class-transformer'
import { LaboratoryModel } from './laboratory.model'

export class EquipmentModel extends Model {
  @Expose()
  public id: string

  @Expose()
  public name: string

  @Expose()
  public code: string

  @Expose()
  public model: string

  @Expose()
  @Transform(value => value && value.id, { toPlainOnly: true })
  public laboratory: LaboratoryModel
}

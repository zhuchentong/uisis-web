import { Model } from '.'
import { Type, Expose } from 'class-transformer'

export class EquipmentModel extends Model {
  @Expose()
  public id: string

  @Expose()
  public name: string

  @Expose()
  public code: string

  @Expose()
  public model: string
}

import { Model } from '.'
import { Expose } from 'class-transformer'

export class LaboratoryTypeModel extends Model {
  @Expose()
  public id: string

  @Expose()
  public name: string

  @Expose()
  public description: string

  @Expose()
  public sortNo: number
}

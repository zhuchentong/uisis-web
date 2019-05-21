import { Model } from '.'
import { Type, Expose } from 'class-transformer'

export class AppverModel extends Model {
  @Expose()
  public id: string

  @Expose()
  public name: string

  @Expose()
  public description: string

  @Expose()
  public versionNumber: number
}

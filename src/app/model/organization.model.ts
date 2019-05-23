import { Model } from '.'
import { Type, Expose } from 'class-transformer'

export class OrganizationModel extends Model {
  @Expose()
  public id
  @Expose()
  public code: string
  @Expose()
  public name: string

  @Type(() => OrganizationModel)
  public parent: OrganizationModel
}

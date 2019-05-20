import { Model } from '.'
import { Type } from 'class-transformer'

export class OrganizationModel extends Model {
  public id

  public code: string

  public name: string

  @Type(() => OrganizationModel)
  public parent: OrganizationModel
}

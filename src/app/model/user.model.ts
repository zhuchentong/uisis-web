import { Model } from '.'
import { Type, Expose } from 'class-transformer'
import { Role, CommonState } from 'app/config/enum.config'
import { OrganizationModel } from './organization.model'

export class UserModel extends Model {
  @Expose()
  public id: string
  @Expose()
  public realName: string
  @Expose()
  public username: string
  @Expose()
  public organization: OrganizationModel
  @Expose()
  public roles: Role[]
  @Expose()
  public state: CommonState
}

import { Model } from '.'
import { Type } from 'class-transformer'
import { Role, CommonState } from 'app/config/enum.config'

export class UserModel extends Model {
  public id: string

  public realName: string

  public username: string

  public roles: Role[]

  public state: CommonState
}

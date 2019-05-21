import { Model } from '.'
import { Type } from 'class-transformer'
import { Role, CommonState } from 'app/config/enum.config'

export class LaboratoryTypeModel extends Model {
  public id: string

  public name: string

  public description: string
}

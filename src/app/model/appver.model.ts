import { Model } from '.'
import { Type } from 'class-transformer'

export class AppverModel extends Model {
  public id: string

  public name: string

  public description: string

  public versionNumber: number
}

import { Model } from '.'
import { Expose } from 'class-transformer'

export class CheckItemModel extends Model {
  @Expose()
  public id
  @Expose()
  public itemNumber: string
  @Expose()
  public itemPoint: string
  @Expose()
  public itemTitle: string
  @Expose()
  public riskLevel: number
  @Expose()
  public parentId: string
  @Expose()
  public type: 'PATH' | 'ITEM'
}

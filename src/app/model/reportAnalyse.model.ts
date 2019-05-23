import { Model } from '.'
import { Type, Expose } from 'class-transformer'

export class ReportAnalyseModel extends Model {
  @Expose()
  public id: string

  @Expose()
  public num: string

  @Expose()
  public laboratory: string

  @Expose()
  public checker: string

  @Expose()
  public rectifyer: string
  @Expose()
  public verifyer: string
  @Expose()
  public unit: string
  @Expose()
  public domain: string
  @Expose()
  public createTime: string
}

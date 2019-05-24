import { Model } from '.'
import { Expose } from 'class-transformer'

export class UploadFileModel extends Model {
  @Expose()
  public id: string

  @Expose()
  public fileName: string

  @Expose()
  public originalName: string

  @Expose()
  public extensionName: string

  @Expose()
  public url: string
}

import { Model } from '.'
import { Expose, Type } from 'class-transformer'
import { UploadFileModel } from './upload-file.model'
import { UserModel } from './user.model'

export class DocumentModel extends Model {
  @Expose()
  public id: string

  @Expose()
  public title: string

  @Expose()
  public description: string

  @Expose()
  public type: string

  @Type(() => UploadFileModel)
  public file: UploadFileModel

  @Expose()
  @Type(() => UserModel)
  public creator: UserModel

  @Expose()
  @Type(() => Date)
  public createTime: Date

  @Expose()
  @Type(() => UserModel)
  public updater: UserModel

  @Expose()
  @Type(() => Date)
  public updateTime: Date
}

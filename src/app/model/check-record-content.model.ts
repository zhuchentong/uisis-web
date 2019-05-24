import { Model } from '.'
import { Expose, Type } from 'class-transformer'
import { UserModel } from './user.model'
import { CheckRecordModel } from './check-record.model'
import { UploadFileModel } from './upload-file.model'

export class CheckRecordContentModel extends Model {
  @Expose()
  public id

  @Expose()
  public title: string

  @Expose()
  @Type(() => CheckRecordModel)
  public checkRecord: CheckRecordModel

  @Expose()
  public content: string

  @Expose()
  // tslint:disable-next-line: max-line-length
  public checkRecordState:
    | 'NO_PROBLEM'
    | 'FOUND_PROBLEM'
    | 'FINAL_CHEPENDING_RECTIFICATIONCK'
    | 'CORRECTION_COMPLETED'
    | 'PENDING_REVIEW'
    | 'REVIEW_PASS'

  @Expose()
  @Type(() => UserModel)
  public creator: UserModel

  @Expose()
  @Type(() => Date)
  public createTime: Date

  @Expose()
  @Type(() => UploadFileModel)
  public attachments: UploadFileModel[]
}

import { plainToClass } from 'class-transformer'
import { ClassType } from 'class-transformer/ClassTransformer'

export class Model {
  public static from<T>(cls: ClassType<T>, obj, data = {}): T {
    return plainToClass(cls, Object.assign(obj, data))
  }
}

import { State, Action, StateContext, Selector } from '@ngxs/store'
import { ExtendState } from 'app/store/extend'
import { UpdateDictAction } from '../action/dict.action'

@State<any>({
  name: 'dict',
  defaults: {}
})
export class DictState extends ExtendState {
  /**
   * 获取字典项
   * @param state 字典数据
   */
  @Selector()
  public static getDict(state) {
    return state
  }

  @Action(UpdateDictAction)
  public updateDict<T>({ setState }: StateContext<any>, { dict }: UpdateDictAction) {
    setState(dict)
  }
}

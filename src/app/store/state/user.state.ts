import { State, Action, StateContext } from '@ngxs/store';
import { LoginAction } from 'app/store/action/user.action';
import { ExtendState } from 'app/store/extend';
import { plainToClass, classToPlain } from 'class-transformer';

@State<any>({
  name: 'user',
  defaults: null,
})
export class UserState extends ExtendState {
  @Action(LoginAction)
  public login<T>({ setState }: StateContext<any>, { user }: LoginAction) {
    setState(classToPlain(user));
  }
}

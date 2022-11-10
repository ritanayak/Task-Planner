import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { UserModel } from '@lct/models/user.model';
import { User } from '@lct/store/user.actions';

interface UserStateModel extends UserModel {}

type UserContext = StateContext<UserStateModel>;

@State<UserStateModel>({
    name: 'user',
    defaults: {
        id: -1,
        name: '',
        phone: '',
        username: '',
        email: ''
    }
})

@Injectable()
export class UserState {

    @Selector()
    static getUsers(state: UserStateModel) {
        return state;
    }

    @Action(User.Initialize)
    public initialize(ctx: UserContext, action: User.Initialize): void {
        ctx.patchState(action.user);
        console.log(ctx);
        console.log(action);
    }

}

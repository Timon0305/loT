import {Injectable} from "@angular/core";
import {Action, Selector, State, StateContext, Store} from "@ngxs/store";
import {GetRole} from "./nav.actions";
import {NavModel} from "./nav.model";

export interface NavStateModel {
    role: any
}

@State<NavStateModel>({
    name: 'role',
    defaults: {
        role: null
    }
})

@Injectable()
export class NavState {
    constructor(
        private store: Store
    ) {}

    @Selector()
    static getChangedRole(state: NavStateModel) {
        return state.role
    }

    @Action(GetRole)
    getRole({getState, setState}: StateContext<NavStateModel>, {payload} : GetRole) {
        let state = getState();
        setState({
            ...state, role: payload
        })
    }
}

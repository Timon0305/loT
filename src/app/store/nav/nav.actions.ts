import {NavModel} from "./nav.model";

export class GetRole {
    static readonly type = '[Role] Get Role';
    constructor(public payload: NavModel) {}
}

import { ActionReducer, Action } from '@ngrx/store';

export const UPDATE_USER = 'UPDATE_USER';
export const UPDATE_BUSSINESS = 'UPDATE_BUSSINESS';

export interface UserState {
    user: Object;
    bussiness: Object;
}

export const UserReducer: ActionReducer<UserState> = (state: UserState, action: Action) => {
    if (!state) {
        state = {
            user: {},
            bussiness: {}
        };
    }
    switch (action.type) {
        case UPDATE_USER:

            state.user = action.payload;
            return state;

        case UPDATE_BUSSINESS:
            state.bussiness = action.payload;
            return state;

        default:
            return state;
    }
};

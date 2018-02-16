import { IAction } from '../../types/action';
import { TOGGLE_SIDE_NAV } from './header.actions';

class IState {
    isOpen: boolean;
}

const initialState: IState = {
    isOpen: false,
};

function header(state: IState = initialState, action: IAction) {
    switch (action.type) {
        case TOGGLE_SIDE_NAV:
            return Object.assign({}, state, {
                isOpen: !state.isOpen,
            });

        default:
            return state;
    }
}

export default header;

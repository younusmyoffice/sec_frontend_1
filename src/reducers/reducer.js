import { getType } from "typesafe-actions";
import { fetchUserAction } from "../actions";

const initialState = {
    loading: false,
    user: {},
    errorMessage: null,
};

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case getType(fetchUserAction.request):
            return {
                ...state,
                loading: true,
            };
        case getType(fetchUserAction.success):
            return {
                ...state,
                loading: false,
                user: action.payload,
            };
        case getType(fetchUserAction.failure):
            return {
                ...state,
                loading: false,
                errorMessage: action.error,
            };
        default:
            return state;
    }
}

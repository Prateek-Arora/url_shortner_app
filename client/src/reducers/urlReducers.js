import { GET_HISTORIC_URLS } from "../actions/types";

const initialState = {
    urls: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_HISTORIC_URLS:
            return {
                ...state,
                urls: action.payload
            };
        default:
            return state;
    }
}
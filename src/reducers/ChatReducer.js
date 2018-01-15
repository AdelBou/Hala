import {
    SET_USER, SEARCH_FRIEND,SET_MESSAGES,SET_FRIEND
} from '../actions/types';

const INITIAL_STATE = {
    thisUser: {
        id: "",
        connected: false,
        searchingForFriend: false,
        name: "",
        chattingWith: null,
    },
    friend: false,
    SearchingFriend: false,
    connected: false,
    messages: [],
    chatting: false,
    error: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case SET_USER:
            return {...state,thisUser: action.payload, error: ''};
        case SEARCH_FRIEND:
            return {...state, SearchingFriend: action.payload, error: ''};
        case SET_MESSAGES:
            return {...state, messages: action.payload, error: ''};
        case SET_FRIEND:
            return {...state, friend: action.payload, error: '',searchingForFriend:false, chatting: true};
        default:
            return state;
    }
};

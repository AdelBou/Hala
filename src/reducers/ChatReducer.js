import {
    SET_USER, SEARCH_FRIEND,SET_MESSAGES,SET_FRIEND,SET_CHATREF,SEND_MESSAGE,STOP_CHATT
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
    chatting: false,
    error: '',
    loading:false,
    chatRef:'',

};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_USER:
            return {...state,thisUser: action.payload, error: ''};
        case SEARCH_FRIEND:
            return {...state, SearchingFriend: action.payload, error: 'جاري البحث',loading:true};
        case SET_FRIEND:
            return {...state, friend: action.payload, error: '',searchingForFriend:false,chatting:true,loading:false};
        case STOP_CHATT:
            return {...state, friend: action.payload, error: 'انتهت المحادثة',chatting:false};
        default:
            return state;
    }
};

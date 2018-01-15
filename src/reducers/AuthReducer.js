import {
  USER_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER
} from '../actions/types';

const INITIAL_STATE = {
  userName: '',
  error : false,
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case USER_CHANGED:
      return { ...state, userName: action.payload ,error:''};

    case LOGIN_USER:
      return { ...state, loading: true, error: '' };

    case LOGIN_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload };

    case LOGIN_USER_FAIL:
      return { ...state,  loading : false , error:'الرجاء ادخال اسم المستخدم' };

    default:
      return state;
  }
};

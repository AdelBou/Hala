import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  USER_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER
} from './types';

export const userChanged = (text) => {
 
  return {
    type: USER_CHANGED,
    payload: text
  };
};


export const loginUser = ({ userName  }) => {

  if(userName === '')
    return{
         type: LOGIN_USER_FAIL 
    };

  return (dispatch) => {

    dispatch({ type: LOGIN_USER });
    firebase.auth().signInAnonymously()
    .then((user)=>  loginUserSuccess(dispatch, user , userName )
    ) .catch((error)=> console.log(error))
  };
};

export const loginAnonymousUser = () => {
    
      return (dispatch) => { 
        dispatch({ type: LOGIN_USER });
        firebase.auth().signInAnonymously()
        .then((user)=> loginUserSuccess(dispatch,user,'مجهول'))
        .catch((error)=> console.log(error))
      };
};


const loginUserSuccess = (dispatch, user ,userName) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });
  Actions.chat({userName});
};

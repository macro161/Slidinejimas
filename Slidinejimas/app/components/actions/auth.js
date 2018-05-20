import { login, logout } from '../../utils/api/auth';
import { getUserInfo } from '../../utils/api/user';
import { history } from '../store';

export const Login = (userName, password) => (dispatch) => {
  dispatch({ type: 'SET_LOADING', value: true });
  login(userName, password).then((response) => {
    if (response.responseCode === 200) {
      dispatch({ type: 'LOGIN_SUCCESS' });
      //getting Current user info
      getUserInfo().then((response) => {
        if (response) {
          dispatch({
            type: 'GET_USER_INFO_SUCCESS',
            info: response,
          });
          dispatch({ type: 'SET_LOADING', value: false });
        }
      });
    } else {
      dispatch({ type: 'LOGIN_ERROR', code: response.responseCode });
      dispatch({ type: 'SET_LOADING', value: false });
    }
  });
};

export const LogOut = () => (dispatch) => {
  dispatch({ type: 'SET_LOADING', value: true});
  logout().then((response) => {
    if (response.responseCode === 200) {
      dispatch({type: 'RESET_USER_INFO'});
    } 
    dispatch({ type: 'SET_LOADING', value: false});
  });
};

export const GetMe = () => (dispatch) => {
  dispatch({ type: 'SET_LOADING', value: true });
  getUserInfo()
    .then((response) => {
      if (response.responseCode === 401){
        history.push('login');
      }
      dispatch({ type: 'SET_LOADING', value: false });
    });

};
import {post } from './http';

const authUrl = 'http://localhost:65399/api/auth';

export function login(username, password){
  const dataObject = {UserName: username, Password: password};
  return post(authUrl + '/login', dataObject).then((response) => {
    return {responseCode: response.status};
  });
}

export function logout(){
  return post(authUrl + '/logout').then((response) => {
    return {responseCode: response.status};
  });
}
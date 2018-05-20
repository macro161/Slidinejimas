import { post, getAll } from './http';

const guestsAPIurl = 'http://localhost:65399/api/Paslaugos/';

export function deleteUser(name) {
  let responseCode;
  return post(guestsAPIurl + 'delete?UserName=' + name)
    .then(function (response) {
      responseCode = response.status;
      if (responseCode !== 204) {
        return response.json();
      }
    })
    .then(function (responseValue) {
      return {
        responseCode,
        responseValue,
      };
    });
}

export function register(name, password) {
  let responseCode;
  return post(guestsAPIurl + 'register', { UserName: name, Password: password })
    .then(function (response) {
      responseCode = response.status;
      if (responseCode !== 204) {
        return response.json();
      }
    })
    .then(function (responseValue) {
      return {
        responseCode,
        responseValue,
      };
    });
}

export function getAllAdmins() {
  let responseCode;
  return getAll(guestsAPIurl)
    .then(function (response) {
      responseCode = response.status;
      if (responseCode === 200) {
        return response.json();
      }
    })
    .then(function (responseValue) {
      return {
        responseCode,
        responseValue,
      };
    });
}
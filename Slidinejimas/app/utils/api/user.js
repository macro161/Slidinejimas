import { getAll } from './http';

const userUrl = 'http://localhost:65399/api/user';

export function getUserInfo() {
  let responseCode;
  return getAll(userUrl + '/me').then((response) => {
    responseCode = response.status;
    if (responseCode === 200) {
      return response.json();
    }
  }).then((responseValue) => {
    return {
      responseCode,
      responseValue,
    };
  });
}

const guestsAPIurl = 'http://localhost:65399/api/guests/CheckAwaiterFor';
import { getAll } from './http';

export function CheckAwaiterFor(name, surname) {
  let responseCode;
  return getAll(guestsAPIurl + '?CheckInName=' + name + '&CheckInSurname=' + surname)
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
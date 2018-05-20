const guestsAPIurl = 'http://localhost:65399/api/guests/checkout';
import { post } from './http';

export function checkOut(checkOutDTO, forceCheckOut) {
  let responseCode;
  return post(guestsAPIurl + '?forceCheckOut=' + forceCheckOut, checkOutDTO)
    .then(function (response) {
      responseCode = response.status;
      if (responseCode !== 200) {
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
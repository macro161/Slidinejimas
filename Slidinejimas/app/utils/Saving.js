import { getAllGuests, insertGuest, updateGuest, getGuestByName, insertDelivery } from '../utils/api/guests';

function alertWithErrorMessage(code, message) {
  alert('Error ' + code + ': ' + message);
}

export const saveCheckIn = (dataObj) => {
  return insertGuest({
    Awaiter: dataObj.awaiter,
    Name: dataObj.name,
    Surname: dataObj.surname,
    Site: dataObj.siteId,
    Img: dataObj.img,
    InterviewSubject: dataObj.interviewSubject,
  });
    
};
export const getAll = (currentPage, reportsPerPage, filter) => {
  return getAllGuests(currentPage, reportsPerPage, filter);
};

export function findCheckedInByName(name, surname) {
  const placeId = JSON.parse(localStorage.getItem('CurrentSiteId'));
  return getGuestByName(name, surname, placeId);
}

export const update = (id) => {
  const date = new Date().toUTCString();
  getAllGuests()
    .then((response) => {
      if (response.responseCode !== 200) {
        alertWithErrorMessage(response.responseCode, response.responseValue);
      }
      const data = response.responseValue;
      for (let i = 0; i < data.length; i++) {
        if (data[i].Id === id) {
          data[i].CheckOutTime = date;
          updateGuest(data[i])
            .then((response) => {
              if (response.responseCode !== 200) {
                alertWithErrorMessage(response.responseCode, response.responseValue);
              }
            });
        }
      }
    });
};

export const createNewCheckout = (dataObj) => {
  const date = new Date().toUTCString();
  insertGuest({
    Name: dataObj.name,
    Surname: dataObj.surname,
    CheckOutTime: date,
    Site: dataObj.siteId,
  })
    .then((response) => {
      if (response.responseCode !== 200) {
        alertWithErrorMessage(response.responseCode, response.responseValue);
      }
    });
};

export const saveDelivery = (dataObj) => {
  return insertDelivery({
    CompanyName: dataObj.companyName,
    Name: dataObj.name,
    Surname: dataObj.surname,
    Site: dataObj.siteId,
    Img: dataObj.img,
  });
};
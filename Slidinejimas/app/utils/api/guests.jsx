const guestsAPIurl = 'http://localhost:65399/api/guests';
import { getAll, post, put, deleteById, getById } from './http';

export function getAllGuests(currentPage, reportsPerPage, filter) {
  let responseCode;
  let queryFilterPart = '';

  if(filter.time){
    queryFilterPart += '&time=' + filter.time;
  }

  if(filter.type){
    queryFilterPart += '&type=' + filter.type;
  }

  if(filter.location){
    queryFilterPart += '&location=' + filter.location;
  }

  return getAll(guestsAPIurl + '?page=' + currentPage + '&limit=' + reportsPerPage + queryFilterPart)
    .then(function (response) {
      responseCode = response.status;
      return response.json();
    })
    .then(function (responseValue) {
      return {
        responseCode,
        responseValue,
      };
    }); 
}
    
export function getGuestById(Id) {
  let responseCode;
  return getById(guestsAPIurl, Id)
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

export function insertGuest(GuestObj) {
  let responseCode;
  return post(guestsAPIurl + '/checkin', GuestObj)
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

export function updateGuest(GuestObj) {
  let responseCode;
  return put(guestsAPIurl, GuestObj)
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

export function deleteSite(Id) {
  let responseCode;
  return deleteById(guestsAPIurl, Id)
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
export function getGuestByName(Name, Surname, placeId) {
  let responseCode;
  return getAll(guestsAPIurl + '/forCheckout?' + 'name=' + Name + '&surname=' + Surname + '&placeId=' + placeId)
    .then(function (response) {
      responseCode = response.status;
      return response.json();
    })
    .then(function (responseValue) {
      return {
        responseCode,
        responseValue,
      };
    });
}

export function insertDelivery(GuestObj) {
  let responseCode;
  return post(guestsAPIurl + '/delivery', GuestObj)
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

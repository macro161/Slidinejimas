const sitesAPIUrl = 'http://localhost:65399/api/sites';
import { getAll, post, put, deleteById, getById } from './http';

export function getAllSites() {
  let responseCode;
  return getAll(sitesAPIUrl)
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

export function getSiteById(Id) {
  let responseCode;
  return getById(sitesAPIUrl, Id)
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

export function insertSite(Name, Address, Phone, ContactEmail) {
  let responseCode;
  return post(sitesAPIUrl, { Name, Address, Phone, ContactEmail })
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

export function updateSite(Id, Name, Address, Phone, ContactEmail) {
  let responseCode;
  return put(sitesAPIUrl, { Id, Name, Address, Phone, ContactEmail })
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
  return deleteById(sitesAPIUrl, Id)
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
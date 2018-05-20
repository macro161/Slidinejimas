import { getAllSites, insertSite, updateSite, deleteSite, getSiteById } from '../../utils/api/sites';

function alertWithErrorMessage(code, message) {
  alert('Error ' + code + ': ' + message);
}

export const ConfigureCurrentSite = () => dispatch => {
  dispatch({ type: 'SET_LOADING', value: true});
  let currentSiteId = localStorage.getItem('CurrentSiteId');
  if (currentSiteId) {
    currentSiteId = currentSiteId.replace(/['"]+/g, '');
    getSiteById(currentSiteId)
      .then(response => {
        dispatch({
          type: 'CONFIGURE_CURRENT_SITE',
          currentSiteIsConfigured: currentSiteId ? true : false,
          currentSiteExists: response.responseCode === 200,
        });
        dispatch({ type: 'SET_LOADING', value: false});
      });
  } else {
    dispatch({
      type: 'CONFIGURE_CURRENT_SITE',
      currentSiteIsConfigured: false,
      currentSiteExists: false,
    });
    dispatch({ type: 'SET_LOADING', value: false});
  }
};

export const GetCurrentSite = () => {
  return {
    type: 'GET_CURRENT_SITE',
    Id: JSON.parse(localStorage.getItem('CurrentSiteId')),
  };
};

export const SetCurrentSite = (Id) => {
  localStorage.setItem('CurrentSiteId', JSON.stringify(Id));
  return {
    type: 'SET_CURRENT_SITE',
    Id,
  };
};

export const GetSites = () => dispatch => {
  dispatch({ type: 'SET_LOADING', value: true});
  getAllSites()
    .then((response) => {
      if (response.responseCode === 200) {
        dispatch({
          type: 'GET_SITES',
          sites: response.responseValue,
        });
      } else {
        alertWithErrorMessage(response.responseCode, response.responseValue);
      }
      dispatch({ type: 'SET_LOADING', value: false});
    });
};

export const AddSite = (Name, Address, Phone, ContactEmail) => dispatch => {
  dispatch({ type: 'SET_LOADING', value: true});
  insertSite(Name, Address, Phone, ContactEmail)
    .then(response => {
      if (response.responseCode === 200) {
        const site = {
          Id: response.responseValue,
          Name,
          Address,
          Phone,
          ContactEmail,
        };
        dispatch({
          type: 'ADD_SITE',
          site,
        });
      } else {
        alertWithErrorMessage(response.responseCode, response.responseValue);
      }
      dispatch({ type: 'SET_LOADING', value: false});
    });
};

export const EditSite = (Id, Name, Address, Phone, ContactEmail) => dispatch => {
  dispatch({ type: 'SET_LOADING', value: true});
  updateSite(Id, Name, Address, Phone, ContactEmail)
    .then(response => {
      if (response.responseCode === 200) {
        const site = {
          Id,
          Name,
          Address,
          Phone,
          ContactEmail,
        };
        dispatch({
          type: 'EDIT_SITE',
          site,
        });
      } else {
        alertWithErrorMessage(response.responseCode, response.responseValue);
      }
      dispatch({ type: 'SET_LOADING', value: false});
  
    });
};

export const DeleteSite = (Id) => dispatch => {
  dispatch({ type: 'SET_LOADING', value: true});
  deleteSite(Id)
    .then(response => {
      if (response.responseCode === 200) {
        dispatch({
          type: 'DELETE_SITE',
          Id,
        });
      } else {
        alertWithErrorMessage(response.responseCode, response.responseValue);
      }
      dispatch({ type: 'SET_LOADING', value: false});
    });
};
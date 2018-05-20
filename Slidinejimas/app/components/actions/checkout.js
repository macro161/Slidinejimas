import { checkOut } from '../../utils/api/checkout';
import store from './../store';
import { getData } from './report';

export const Validate = (name, surname) => {
  return {
    type: 'VALIDATE_CHECKOUT',
    name,
    surname,
  };
};

export const Redirect = () => {
  return {
    type: 'REDIRECT',
  };
};
export const HideSuccess = () => {
  return {
    type: 'SAVE_SHOW_SUCCESS',
    ShowSuccess: false,
  };
};
export const HideWrong = () => {
  return {
    type: 'SAVE_SHOW_WRONG',
    ShowWrong: false,
  };
};

export const CheckOut = (name, surname, forceCheckOut, site) => dispatch => {
  dispatch({ type: 'SET_LOADING', value: true});
  let siteToCheckOut; // the admins does not have the currentSite, so they get the site from the guest list item
  
  if(site){
    siteToCheckOut = site; // the admin checks out the guest
  } else {
    siteToCheckOut = store.getState().sites.currentSiteId; // the guest checks herseft/himself out
  }

  const checkOutDTO = { name, surname, site: siteToCheckOut };

  checkOut(checkOutDTO, forceCheckOut)
    .then(response => {
      if (response.responseCode === 200) {
        dispatch({
          type: 'SAVE_CHECKOUT',
        });
        const reportState = store.getState().report;
        dispatch(getData(reportState.filter, reportState.pager, reportState.data));
      } else {
        dispatch({
          type: 'FAILED_CHECKOUT',
        });
      }
      dispatch({ type: 'SET_LOADING', value: false});
    });
};
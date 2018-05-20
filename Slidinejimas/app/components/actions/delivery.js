import { saveDelivery } from '../../utils/Saving';
import store from './../store';

export const Validate = (companyName, name, surname) => {
  return {
    type: 'VALIDATE_DELIVERY',
    companyName,
    name,
    surname,
  };
};

export const Save = (companyName, name, surname, screenshot) => (dispatch) => {
  dispatch({ type: 'SET_LOADING', value: true});
  saveDelivery({ companyName: companyName, name: name, surname: surname, siteId: store.getState().sites.currentSiteId, img: screenshot })
    .then((response) => {
      const saved = response.responseCode === 200;
      dispatch({
        type: 'SAVE_DELIVERY',
        saved,
        error: response.responseValue,
      });
      dispatch({ type: 'SET_LOADING', value: false});
    });
    
}
;
export const Reset = () => {
  return {
    type: 'RESET',
  };
};
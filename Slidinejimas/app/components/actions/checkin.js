import { saveCheckIn } from '../../utils/Saving';
import { CheckAwaiterFor } from '../../utils/api/checkin';
import store from './../store';

export const Validate = (name, surname, awaiter) => {
  return {
    type: 'VALIDATE_CHECKIN',
    name,
    surname,
    awaiter,
  };
};

export const CheckAwaiter = (name, surname) => (dispatch) => {
  CheckAwaiterFor(name, surname)
    .then((response) => {
      const success = response.responseCode === 200;
      dispatch({
        type: 'FILL_AWAITER',
        awaiterFieldDisabled: success,
        awaiterName: success ? response.responseValue.AwaitersEmail : '',
        interviewSubject: success ? response.responseValue.InterviewSubject : '',
      });
    });
};

export const Save = (name, surname, awaiter, screenshot, interviewSubject) => (dispatch) => {
  dispatch({ type: 'SET_LOADING', value: true });
  saveCheckIn({ awaiter: awaiter, name: name, surname: surname, siteId: store.getState().sites.currentSiteId, img : screenshot , interviewSubject})
    .then((response) => {
      const saved = response.responseCode === 200;
      dispatch({
        type: 'SAVE_CHECKIN',
        saved,
        error: response.value,
      });
      dispatch({ type: 'SET_LOADING', value: false });
    });
};

export const Reset = () => {
  return {
    type: 'RESET',
  };
};
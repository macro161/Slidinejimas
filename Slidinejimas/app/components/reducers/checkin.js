import { validateCheckIn } from '../../utils/Validator';

const initialState = {
  valid: false,
  saved: false,
  error: null,
  awaiterFieldDisabled: false,
  awaiterName: '',
  interviewSubject: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'VALIDATE_CHECKIN':
      return {
        ...state,
        valid: validateCheckIn({name: action.name, surname: action.surname, awaiter: action.awaiter}),
      };
    case 'SAVE_CHECKIN':  {
      return {
        ...state,
        saved: action.saved,
        error: action.error,
      };
    }
    case 'RESET': {
      return initialState;
    }
    case 'FILL_AWAITER': {
      return {
        ...state,
        awaiterFieldDisabled: action.awaiterFieldDisabled,
        awaiterName: action.awaiterName,
        interviewSubject: action.interviewSubject,
      };
    }
    default:
      return state;
  }   
}; 
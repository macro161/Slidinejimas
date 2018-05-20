import { validateDelivery } from '../../utils/Validator';

const initialState = {
  valid: false,
  saved: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'VALIDATE_DELIVERY':
      return {
        ...state,
        valid: validateDelivery({ companyName: action.companyName, name: action.name, surname: action.surname }),
      };
    case 'SAVE_DELIVERY': {
      return {
        ...state,
        saved: action.saved,
        error: action.error,
      };
    }
    case 'RESET': {
      return initialState;
    }
    default:
      return state;
  }
}; 
import { validateCheckOut } from '../../utils/Validator';

const initialState = {
  valid: false,
  redirect: false,
  ShowSuccess: false,
  ShowWrong: false,
  secondClick: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'VALIDATE_CHECKOUT':
      return {
        ...state,
        valid: validateCheckOut({ name: action.name, surname: action.surname }),
      };
    case 'SAVE_CHECKOUT': {
      return {
        ...state,
        redirect: true,
        secondClick: false,
        ShowSuccess: true,
      };
    }
    case 'SAVE_SHOW_SUCCESS':
      return {
        ...state,
        ShowSuccess: action.ShowSuccess,
      };
    case 'SAVE_SHOW_WRONG':
      return {
        ...state,
        ShowWrong: action.ShowWrong,
      };
    case 'FAILED_CHECKOUT': {
      return {
        ...state,
        secondClick: true,
        ShowWrong: true,
      };
    }
    case 'REDIRECT': {
      return {
        ...state,
        redirect: false,
      };
    }
    default:
      return state;
  }
}; 
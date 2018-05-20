const initialState = {
  admins: [],
};
export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ADMIN':
      return {
        ...state,
        admins: [...state.admins, action.name],
      };
    case 'REMOVE_ADMIN_BY_NAME':
    {
      return {
        ...state,
        admins: state.admins.filter(admin => admin != action.name),
      };
    }
    case 'GET_ALL_ADMINS':
    {
      return {
        ...state,
        admins: action.admins,
      };
    }
    default:
      return state;
  }
};
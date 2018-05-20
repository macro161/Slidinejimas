import { register, deleteUser, getAllAdmins } from '../../utils/api/admin';
export const AddAdmin = (name, pass) => dispatch => {
  register(name, pass)
    .then(function (response) {
      if (response.responseCode != 204) {
        alert(response.responseValue.ErrorMessage);
      } else {
        dispatch({
          type: 'ADD_ADMIN',
          name,
        });
      }
    });
};

export const RemoveAdmin = (name) => dispatch => {
  deleteUser(name)
    .then(function (response) {
      if (response.responseCode != 204) {
        alert(response.responseValue.ErrorMessage);
      } else {
        dispatch({
          type: 'REMOVE_ADMIN_BY_NAME',
          name,
        });
      }
    });
};

export const GetAll = () => dispatch => {
  getAllAdmins()
    .then(function (response) {
      dispatch({
        type: 'GET_ALL_ADMINS',
        admins: response.responseValue,
      });
    });
};
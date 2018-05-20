import { getAll } from '../../utils/Saving';
import { getSiteById, getAllSites } from '../../utils/api/sites';

function alertWithErrorMessage(code, message) {
  alert('Error ' + code + ': ' + message);
}
export const setFilter = (filter) => {
  return {
    type: 'SET_FILTER',
    filter: filter,
  };
};

export const getData = (filter, pager, data) => dispatch => {
  dispatch({ type: 'SET_LOADING', value: true});
  const {currentPage, reportsPerPage} = pager;

  getAll(currentPage, reportsPerPage, filter)
    .then((response) => {
      if (response.responseCode !== 200) {
        alertWithErrorMessage(response.responseCode, response.responseValue);
      } else {
        data = response.responseValue.guests;
        const totalReportCount = response.responseValue.totalGuestCount;

        dispatch({
          type: 'GET_DATA',
          data: data,
          totalReportCount: totalReportCount,
          pager: pager,
        });
      }
      dispatch({ type: 'SET_LOADING', value: false});
    });
};

export const getCurrentSite = () => dispatch => {
  dispatch({ type: 'SET_LOADING', value: true});
  let CurrentSite;
  const siteId = JSON.parse(localStorage.getItem('CurrentSiteId'));
  getSiteById(siteId)
    .then((response) => {
      if (response.responseCode === 200) {
        CurrentSite = response.responseValue.Name;
        dispatch({
          type: 'GET_SITE_NAME',
          site: CurrentSite,
        });
      } else {
        alertWithErrorMessage(response.responseCode, response.responseValue);
      }
      dispatch({ type: 'SET_LOADING', value: false});
    });
};
export const getSites = () => dispatch => {
  dispatch({ type: 'SET_LOADING', value: true});
  getAllSites()
    .then((response) => {
      if (response.responseCode === 200) {
        dispatch({
          type: 'GET_SITES_FOR_FILTER',
          sites: response.responseValue,
        });
      } else {
        alertWithErrorMessage(response.responseCode, response.responseValue);
      }
      dispatch({ type: 'SET_LOADING', value: false});
    });
};
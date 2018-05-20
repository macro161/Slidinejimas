const initialState = {
  filter: { type: null, time: null, location: null },
  data: [],
  sites: [],
  currentSite: null,
  pager: {
    totalReportCount: 0,
    currentPage: 1,
    reportsPerPage: 10,
  },
};
export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FILTERS':
      return {
        ...state, filter: action.filter,
      };
    case 'GET_DATA':
      return {
        ...state,
        data: action.data,
        pager: {
          ...action.pager,
          totalReportCount: action.totalReportCount,
        },
      };
    case 'GET_SITE_NAME':
      return {
        ...state, currentSite: action.site,
      };
    case 'GET_SITES_FOR_FILTER':
      return{
        ...state, sites: action.sites,
      };
    default:
      return state;
  }
};
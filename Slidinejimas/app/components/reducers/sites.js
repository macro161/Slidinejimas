const initialState = {
  loading: false,
  sites: [],
  currentSiteIsConfigured: null,
  currentSiteExists: false,
  currentSiteId: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_SITES':
      return {
        ...state, sites: action.sites,
      };

    case 'ADD_SITE':
      return {
        ...state, sites: [...state.sites, action.site],
      };

    case 'EDIT_SITE':
      return {
        ...state, sites: state.sites.map((site) => site.Id === action.site.Id ?
          {
            ...site,
            Name: action.site.Name,
            Address: action.site.Address,
            Phone: action.site.Phone,
            ContactEmail: action.site.ContactEmail,
          } :
          site
        ),
      };

    case 'DELETE_SITE':
      return {
        ...state, sites: state.sites.filter(site => site.Id !== action.Id), currentSiteId: state.currentSiteId === action.Id ? null : state.currentSiteId,
      };

    case 'CONFIGURE_CURRENT_SITE':
      return {
        ...state,
        currentSiteIsConfigured: action.currentSiteIsConfigured,
        currentSiteExists: action.currentSiteExists,
      };

    case 'GET_CURRENT_SITE':
    case 'SET_CURRENT_SITE':
      return {
        ...state, currentSiteId: action.Id,
      };
    case 'SET_LOADING':
      return {
        ...state, loading: action.value,
      };

    default:
      return state;
  }
};
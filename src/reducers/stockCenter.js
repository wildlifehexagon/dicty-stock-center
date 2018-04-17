// @flow
import { dsctypes } from "constants/dsctypes"

const {
  AVAILABILITY_FETCH_SUCCESS,
  AVAILABILITY_FETCH_REQUEST,
  AVAILABILITY_FETCH_FAILURE,
  STRAINS_FETCH_REQUEST,
  STRAINS_FETCH_SUCCESS,
  STRAINS_FETCH_FAILURE,
  SEARCH_STRAINS_REQUEST,
  STRAIN_FETCH_REQUEST,
  STRAIN_FETCH_SUCCESS,
  STRAIN_FETCH_FAILURE,
  STRAINS_SEARCH_REQUEST,
  STRAINS_SEARCH_SUCCESS,
  STRAINS_SEARCH_FAILURE,
  CLEAR_STRAINS,
  PLASMIDS_FETCH_REQUEST,
  PLASMIDS_FETCH_SUCCESS,
  PLASMIDS_FETCH_FAILURE,
  PLASMIDS_SEARCH_REQUEST,
  PLASMIDS_SEARCH_SUCCESS,
  PLASMIDS_SEARCH_FAILURE,
  CLEAR_PLASMIDS
} = dsctypes

const initialState = {
  availability: {
    isFetching: false
  },
  strainCatalog: {
    isFetching: false,
    data: [],
    links: {},
    meta: {
      pagination: {
        number: 1
      }
    }
  },
  strain: {
    isFetching: false
  },
  plasmidCatalog: {
    isFetching: false,
    data: [],
    links: {},
    meta: {
      pagination: {
        number: 1
      }
    }
  },
  plasmid: {
    isFetching: false
  }
}

const stockCenterReducer = (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case AVAILABILITY_FETCH_REQUEST:
      return {
        ...state,
        availability: {
          isFetching: true
        }
      }
    case AVAILABILITY_FETCH_SUCCESS:
      return {
        ...state,
        availability: {
          isFetching: false,
          data: action.payload.availability
        }
      }
    case AVAILABILITY_FETCH_FAILURE:
      return {
        ...state,
        availability: {
          isFetching: false,
          error: action.payload.error
        }
      }
    case STRAINS_FETCH_REQUEST:
      return {
        ...state,
        strainCatalog: {
          ...state.strainCatalog,
          isFetching: true
        }
      }
    case STRAINS_FETCH_SUCCESS:
      return {
        ...state,
        strainCatalog: {
          ...state.strainCatalog,
          isFetching: false,
          links: action.payload.links,
          meta: action.payload.meta,
          data: state.strainCatalog.data.concat(action.payload.data)
        }
      }
    case STRAINS_FETCH_FAILURE:
      return {
        ...state,
        strainCatalog: {
          ...state.strainCatalog,
          isFetching: false,
          error: action.payload.error
        }
      }
    case SEARCH_STRAINS_REQUEST:
      return {
        ...state,
        strainCatalog: {
          ...state.strainCatalog,
          isFetching: false,
          error: action.payload.error
        }
      }
    case STRAINS_SEARCH_REQUEST:
      return {
        ...state,
        strainCatalog: {
          ...state.strainCatalog,
          isFetching: true
        }
      }
    case STRAINS_SEARCH_SUCCESS:
      return {
        ...state,
        strainCatalog: {
          ...state.strainCatalog,
          isFetching: false,
          data: action.payload.data,
          links: action.payload.links,
          meta: action.payload.meta
        }
      }
    case STRAINS_SEARCH_FAILURE:
      return {
        ...state,
        strainCatalog: {
          ...state.strainCatalog,
          isFetching: false,
          error: action.payload.error
        }
      }
    case CLEAR_STRAINS:
      return {
        ...state,
        strainCatalog: {
          ...state.strainCatalog,
          data: [],
          meta: {
            pagination: {
              number: 1
            }
          },
          links: {}
        }
      }
    case STRAIN_FETCH_REQUEST:
      return {
        ...state,
        strain: {
          ...state.strain,
          isFetching: true
        }
      }
    case STRAIN_FETCH_SUCCESS:
      return {
        ...state,
        strain: {
          isFetching: false,
          ...action.payload.data
        }
      }
    case STRAIN_FETCH_FAILURE:
      return {
        ...state,
        strain: {
          ...state.strain,
          isFetching: false,
          error: action.payload.error
        }
      }
    case PLASMIDS_FETCH_REQUEST:
      return {
        ...state,
        plasmidCatalog: {
          ...state.plasmidCatalog,
          isFetching: true
        }
      }
    case PLASMIDS_FETCH_SUCCESS:
      return {
        ...state,
        plasmidCatalog: {
          ...state.plasmidCatalog,
          isFetching: false,
          links: action.payload.links,
          meta: action.payload.meta,
          data: state.plasmidCatalog.data.concat(action.payload.data)
        }
      }
    case PLASMIDS_FETCH_FAILURE:
      return {
        ...state,
        plasmidCatalog: {
          ...state.plasmidCatalog,
          isFetching: false,
          error: action.payload.error
        }
      }
    case PLASMIDS_SEARCH_REQUEST:
      return {
        ...state,
        plasmidCatalog: {
          ...state.plasmidCatalog,
          isFetching: true
        }
      }
    case PLASMIDS_SEARCH_SUCCESS:
      return {
        ...state,
        plasmidCatalog: {
          ...state.plasmidCatalog,
          isFetching: false,
          data: action.payload.data,
          links: action.payload.links,
          meta: action.payload.meta
        }
      }
    case PLASMIDS_SEARCH_FAILURE:
      return {
        ...state,
        plasmidCatalog: {
          ...state.plasmidCatalog,
          isFetching: false,
          error: action.payload.error
        }
      }
    case CLEAR_PLASMIDS:
      return {
        ...state,
        plasmidCatalog: {
          ...state.plasmidCatalog,
          data: [],
          links: {},
          meta: {
            pagination: {
              number: 1
            }
          }
        }
      }
    default:
      return state
  }
}

export default stockCenterReducer

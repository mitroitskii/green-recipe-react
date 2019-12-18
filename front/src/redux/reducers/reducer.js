import {
  IS_LOGGED_GOT_RESPONSE,
  IS_LOGGED_ERROR,
  LOGIN_REQUEST,
  LOGIN_GOT_RESPONSE,
  LOGIN_ERROR,
  REGISTER_REQUEST,
  REGISTER_GOT_RESPONSE,
  REGISTER_ERROR,
  CLEAR_STATUS,
  IS_LOGGED_REQUEST,
  LOGOUT_REQUEST,
  LOGOUT_GOT_RESPONSE,
  LOGOUT_ERROR,
  PARSE_REQUEST,
  PARSE_GOT_RESPONSE,
  PARSE_ERROR,
  SET_CARD_DIMENSIONS,
} from '../types/types';

const initialState = {
  isLoggedIn: false,
  loadingFetch: false,
  logRegstatusError: '',
  registrationStatus: '',
  questions: [],
  userId: '',
  userName:'',
  ingredientsParsed: [],
  cardHeight: '',
  cardWidth: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    ///////////////////////isLoggedChecking//////////////////////
    case IS_LOGGED_REQUEST: {
      return {
        ...state,
        loadingFetch: true,
        logRegstatusError: '',
      };
    }
    case IS_LOGGED_GOT_RESPONSE: {
      return {
        ...state,
        isLoggedIn: action.isLoggedIn,
        loadingFetch: false,
        logRegstatusError: '',
        userId: action.userId,
        userName: action.userName
      };
    }
    case IS_LOGGED_ERROR: {
      return {
        ...state,
        loadingFetch: false,
        logRegstatusError: action.logRegstatusError,
      };
    }
    ///////////////////////LOGIN////////////////////////////////
    case LOGIN_REQUEST: {
      return {
        ...state,
        isLoggedIn: false,
        loadingFetch: true,
        logRegstatusError: '',
      };
    }
    case LOGIN_GOT_RESPONSE: {
      return {
        ...state,
        isLoggedIn: action.isLoggedIn,
        loadingFetch: false,
        logRegstatusError: '',
        userId: action.userId,
        userName: action.userName
      };
    }
    case LOGIN_ERROR: {
      return {
        ...state,
        loadingFetch: false,
        logRegstatusError: action.logRegstatusError,
      };
    }
    ////////////////////REGISTRATION////////////////////////////
    case REGISTER_REQUEST: {
      return {
        ...state,
        loadingFetch: true,
        logRegstatusError: '',
      };
    }
    case REGISTER_GOT_RESPONSE: {
      return {
        ...state,
        loadingFetch: false,
        registrationStatus: action.registrationStatus,
        logRegstatusError: '',
      };
    }
    case REGISTER_ERROR: {
      return {
        ...state,
        loadingFetch: false,
        logRegstatusError: action.logRegstatusError,
      };
    }
    case CLEAR_STATUS: {
      return {
        ...state,
        loadingFetch: false,
        logRegstatusError: '',
        registrationStatus: '',
      };
    }
    ////////////////////LOGOUT////////////////////////////
    case LOGOUT_REQUEST: {
      return {
        ...state,
        loadingFetch: true,
        logRegstatusError: '',
      };
    }
    case LOGOUT_GOT_RESPONSE: {
      return {
        ...state,
        isLoggedIn: action.isLoggedIn,
        loadingFetch: false,
        logRegstatusError: '',
        userId: '',
        userName: ''
      };
    }
    case LOGOUT_ERROR: {
      return {
        ...state,
        loadingFetch: false,
        logRegstatusError: action.logRegstatusError,
      };
    }
    ////////////////////PARSE////////////////////////////
    case PARSE_REQUEST: {
      return {
        ...state,
        loadingFetch: true,
        parseError: '',
      };
    }
    case PARSE_GOT_RESPONSE: {
      return {
        ...state,
        loadingFetch: false,
        ingredientsParsed: action.ingredientsParsed,
        parseError: '',
      };
    }
    case PARSE_ERROR: {
      return {
        ...state,
        loadingFetch: false,
        parseError: action.parseError,
      };
    }
    //////////////////SET_CARD_DIMENSIONS///////////////////
    case SET_CARD_DIMENSIONS: {
      return {
        ...state,
        cardHeight: action.cardHeight,
        cardWidth: action.cardWidth,
      };
    }
    default:
      return state;
  }
}

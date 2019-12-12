import { IS_LOGGED_GOT_RESPONSE, IS_LOGGED_ERROR, LOGIN_REQUEST, LOGIN_GOT_RESPONSE, LOGIN_ERROR, REGISTER_REQUEST, REGISTER_GOT_RESPONSE, REGISTER_ERROR, CLEAR_STATUS, IS_LOGGED_REQUEST, LOGOUT_REQUEST, LOGOUT_GOT_RESPONSE, LOGOUT_ERROR} from '../types/types'


const initialState = {
    isLoggedIn: false,
    logRegloadingFetch: false,
    logRegstatusError: '',
    registrationStatus: '',
    questions: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case IS_LOGGED_REQUEST: {
            return {
                ...state,
                logRegloadingFetch: true,
                logRegstatusError: '',
            };
        }
        case IS_LOGGED_GOT_RESPONSE: {
            return {
                ...state,
                isLoggedIn: action.isLoggedIn,
                logRegloadingFetch: false,
                logRegstatusError: '',
            };
        }
        case IS_LOGGED_ERROR: {
            return {
                ...state,
                logRegloadingFetch: false,
                logRegstatusError: action.logRegstatusError,
            }
        }

        case LOGIN_REQUEST: {
            return {
                ...state,
                isLoggedIn: false,
                logRegloadingFetch: true,
                logRegstatusError: '',
            };
        }
        case LOGIN_GOT_RESPONSE: {
            return {
                ...state,
                isLoggedIn: action.isLoggedIn,
                logRegloadingFetch: false,
                logRegstatusError: '',
            };
        }
        case LOGIN_ERROR: {
            return {
                ...state,
                logRegloadingFetch: false,
                logRegstatusError: action.logRegstatusError,
            }
        }
        case REGISTER_REQUEST: {
            return {
                ...state,
                logRegloadingFetch: true,
                logRegstatusError: '',
            };
        }
        case REGISTER_GOT_RESPONSE: {
            return {
                ...state,
                logRegloadingFetch: false,
                registrationStatus: action.registrationStatus,
                logRegstatusError: '',
            };
        }
        case REGISTER_ERROR: {
            return {
                ...state,
                logRegloadingFetch: false,
                logRegstatusError: action.logRegstatusError,
            }
        }
        case LOGOUT_REQUEST: {
            return {
                ...state,
                logRegloadingFetch: true,
                logRegstatusError: '',
            };
        }
        case LOGOUT_GOT_RESPONSE: {
            return {
                ...state,
                isLoggedIn: action.isLoggedIn,
                logRegloadingFetch: false,
                logRegstatusError: '',
            };
        }
        case LOGOUT_ERROR: {
            return {
                ...state,
                logRegloadingFetch: false,
                logRegstatusError: action.logRegstatusError,
            }
        }
        case CLEAR_STATUS: {
            return {
                ...state,
                logRegloadingFetch: false,
                logRegstatusError: '',
                registrationStatus: '',
            }
        }
        default:
            return state;
    }
}

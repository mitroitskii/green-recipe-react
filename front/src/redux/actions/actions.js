import { put, call, takeEvery } from "redux-saga/effects";
import { IS_LOGGED_GOT_RESPONSE, IS_LOGGED_ERROR, FETCHED_IS_LOGGED, LOGIN_REQUEST, LOGIN_GOT_RESPONSE, LOGIN_ERROR, FETCHED_LOGIN, REGISTER_REQUEST, REGISTER_GOT_RESPONSE, REGISTER_ERROR, FETCHED_REGISTER, CLEAR_STATUS, IS_LOGGED_REQUEST, LOGOUT_REQUEST, LOGOUT_GOT_RESPONSE, LOGOUT_ERROR, FETCHED_LOGOUT} from '../types/types'

/////////////////////isLoggedChecking//////////////////////
export const isLoggedRequestAC = () => {
  return { type: IS_LOGGED_REQUEST, }
};

export const isLoggedGotResponseAC = (result) => {
  return { type: IS_LOGGED_GOT_RESPONSE, isLoggedIn: result.isLoggedIn, }
};

export const isLoggedErrorAC = (error) => {
  return { type: IS_LOGGED_ERROR, logRegstatusError: error.message, }
};

export function* isLoggedFetchAsyncAC(action) {
  try {
    yield put(isLoggedRequestAC());
    const response = yield fetch("http://localhost:5000/api/users/isLogged", {
      credentials: "include"})
      let result = yield call(() => response.json())
      if (response.status === 200) {
        yield put(isLoggedGotResponseAC(result))
      } else {
        console.log(result);
      }
  } catch(error) {
    yield put(isLoggedErrorAC(error));
  }
}

export const isLoggedFetchAC = () => {
  return { type: FETCHED_IS_LOGGED, }
};

////////////////////////LOGIN/////////////////////////////
export const loginRequestAC = () => {
  return { type: LOGIN_REQUEST, }
};


export const loginGotResponseAC = (result) => {
  return { type: LOGIN_GOT_RESPONSE, isLoggedIn: result.isLoggedIn }
};

export const loginErrorAC = (err) => {
  return { type: LOGIN_ERROR, logRegstatusError: err }
};


export function* loginFetchAsyncAC(action) {
  try {
    yield put(loginRequestAC());
    const response = yield call(() =>
      fetch("http://localhost:5000/api/users/login", {
        method: 'POST',
        credentials: "include",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: action.data.username,
          password: action.data.password,
        })
      }));
    if (response.status === 200) {
      const result = yield call(() => response.json())
      yield put(loginGotResponseAC(result))
    } else if (response.status === 400) {
      let err = yield call(() => response.json())
      yield put(loginErrorAC(err))
    }
  } catch (error) {
    console.log(error);
  }
}

export const loginFetchAC = (data) => {
  return { type: FETCHED_LOGIN, data }
};



//////////////////////REGISTRATION/////////////////////

export const registerRequestAC = () => {
  return { type: REGISTER_REQUEST, }
};


export const registerGotResponseAC = (result) => {
  return { type: REGISTER_GOT_RESPONSE, registrationStatus: result.registrationStatus}
};

export const registerErrorAC = (err) => {
  return { type: REGISTER_ERROR, logRegstatusError: err }
};

export function* registerFetchAsyncAC(action) {
  try {
    yield put(registerRequestAC())
    const response = yield call(() =>
      fetch("http://localhost:5000/api/users/registration", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: action.data.username,
          password: action.data.password,
          email: action.data.email,
        })
      }));
    if (response.status === 200) {
      let result = yield call(() => response.json())
      yield put(registerGotResponseAC(result))
    } else if (response.status === 400) {
      let err = yield call(() => response.json())
      yield put(registerErrorAC(err))
    }
  } catch (error) {
    console.log(error);
  }
}

export const registerFetchAC = (data) => {
  return { type: FETCHED_REGISTER, data }
};

//////////////////////////LOGOUT/////////////////////////////
export const logoutRequestAC = () => {
  return { type: LOGOUT_REQUEST, }
};

export const logoutGotResponseAC = (result) => {
  return { type: LOGOUT_GOT_RESPONSE, isLoggedIn: result.isLoggedIn, }
};

export const logoutErrorAC = (error) => {
  return { type: LOGOUT_ERROR, logRegstatusError: error.message, }
};

export function* logoutFetchAsyncAC(action) {
  try {
    yield put(logoutRequestAC());
    const response = yield fetch("http://localhost:5000/api/users/logout", {
      credentials: "include",
    method:'DELETE'})
      let result = yield call(() => response.json())
      if (response.status === 200) {
        yield put(logoutGotResponseAC(result))
      } else {
        console.log(result);
      }
  } catch(error) {
    yield put(logoutErrorAC(error));
  }
}

export const logoutFetchAC = () => {
  return { type: FETCHED_LOGOUT, }
};

/////////////////////WatchFetches//////////////////////////

export function* watchFetches() {
  yield takeEvery(FETCHED_IS_LOGGED, isLoggedFetchAsyncAC);
  yield takeEvery(FETCHED_LOGIN, loginFetchAsyncAC);
  yield takeEvery(FETCHED_REGISTER, registerFetchAsyncAC);
  yield takeEvery(FETCHED_LOGOUT, logoutFetchAsyncAC);
};

///////////////////clearStatusAC//////////////////////

export const clearStatusAC = () => {
  return { type: CLEAR_STATUS }
}




// export const SessionCheckerAC = (isLoggedIn) => {
//   return {
//     type: SESSION_CHECKER,
//     isLoggedIn: isLoggedIn
//   }
// };


// export const loginFetchAC = (data) => {
//   return async (dispatch) => {
//     try {
//       dispatch(loginRequestAC())
//       const response = await fetch("http://localhost:5000/api/login", {
//         method: 'POST',
//         credentials: "include",
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           username: data.username,
//           password: data.password,
//         })
//       });
//       if (response.status === 200) {
//         let result = await response.json()
//         dispatch(loginGotResponseAC(result))
//       } else if (response.status === 400) {
//         console.log(`ERROR: ${response.status}`);
//         let err = await response.json()
//         dispatch(loginErrorAC(err))
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }
// }
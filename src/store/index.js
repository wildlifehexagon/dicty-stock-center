// @flow
import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import rootReducer from "../reducers"
import { connectRouter, routerMiddleware } from "connected-react-router"
import { manageStateStorage } from "dicty-components-redux"
import callAPI from "middlewares/callAPI"
import { dsctypes } from "constants/dsctypes"
import history from "utils/routerHistory"

const authArg = {
  save_action: dsctypes.LOGIN_SUCCESS,
  remove_action: dsctypes.LOGOUT_SUCCESS,
  key: "auth",
  namespace: "auth",
}
const roleArg = {
  save_action: dsctypes.FETCH_ROLE_SUCCESS,
  remove_action: dsctypes.LOGOUT_SUCCESS,
  key: "auth",
  namespace: "auth",
}
const permArg = {
  save_action: dsctypes.FETCH_PERMISSION_SUCCESS,
  remove_action: dsctypes.LOGOUT_SUCCESS,
  key: "auth",
  namespace: "auth",
}
const cartArg = {
  save_action: dsctypes.ADD_TO_CART,
  remove_action: dsctypes.REMOVE_FROM_CART,
  key: "cart",
  namespace: "shoppingCart",
}

const enhancer = applyMiddleware(
  routerMiddleware(history),
  thunk,
  callAPI,
  manageStateStorage(authArg),
  manageStateStorage(roleArg),
  manageStateStorage(permArg),
  manageStateStorage(cartArg),
)

export default function configureStore(initialState: Object) {
  const store = createStore(
    connectRouter(history)(rootReducer),
    initialState,
    enhancer,
  )
  if (process.env.NODE_ENV === "development") {
    if (module.hot) {
      module.hot.accept("../reducers", () =>
        store.replaceReducer(require("../reducers").default),
      )
    }
  }
  return store
}

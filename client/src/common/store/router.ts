import {connectRouter, push, replace} from 'connected-react-router'

const action = { push, replace }

const createReducer = (history) =>
  connectRouter(history)

export {
  action,
  createReducer
}

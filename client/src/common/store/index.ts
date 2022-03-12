import {routerMiddleware} from 'connected-react-router'
import {map} from 'lodash'
import {applyMiddleware, combineReducers, createStore as createStore_, Store} from 'redux'
import {createLogger} from 'redux-logger'
import {combineEpics, createEpicMiddleware} from 'redux-observable'
import {persistStore} from 'redux-persist'
import thunk from 'redux-thunk'
import {createReducer as createConfigReducer} from './config'
import {createReducer as createRouterReducer} from './router'
import {createReducer as createUsersReducer, UsersEpic} from './users'


const multiActionMiddleware = store => next => action => {
    if (!Array.isArray(action)) {
        return next(action)
    }
    return map(action, x => store.dispatch(x))
}

const createRootReducer = (history, apiUrl) =>
    combineReducers({
        config: createConfigReducer(apiUrl),
        users: createUsersReducer(),
        router: createRouterReducer(history),
    })

const createStore = (history, apiUrl) => {
    const epicMiddleware = createEpicMiddleware()
    const rootEpic = combineEpics(
        UsersEpic
    )

    const store = createStore_(
        createRootReducer(history, apiUrl),
        undefined,
        applyMiddleware(
            multiActionMiddleware,
            epicMiddleware,
            thunk,
            routerMiddleware(history),
            createLogger()
        )
    )
    epicMiddleware.run(rootEpic)
    return store
}

const createPersistStore = (store: Store) =>
    persistStore(store)

export {
    createPersistStore,
    createStore
}

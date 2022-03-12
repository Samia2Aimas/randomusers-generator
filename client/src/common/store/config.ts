import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const initialState = {
   apiBaseUrl: ''
}


const configReducer = (apiUrl) =>
    (state = initialState) => ({apiBaseUrl: apiUrl})


const createReducer = (apiUrl) => {
    const authPersistConfig = {
        key: 'auth',
        storage: storage,
        whitelist: ['accessToken', 'expiresAt', 'idToken']
    }

    return persistReducer(authPersistConfig, configReducer(apiUrl))
}
export {
    createReducer
}

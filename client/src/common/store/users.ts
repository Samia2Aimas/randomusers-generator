import {Action} from 'redux'
import {actionCreatorFactory, isType} from 'typescript-fsa'
import {combineEpics, ofType} from "redux-observable";
import {catchError, map, mergeMap} from "rxjs/operators";
import {from, of} from "rxjs";
import {createGetRequestFactory} from "../net/createGetRequestFactory";

const actionCreator = actionCreatorFactory()

const getUsersStarted = actionCreator('GET_USERS_STARTED')
const getUsersResult = actionCreator<{ randomUsers: {data: string} }>('GET_USERS_RESULT')
const getUsersFailed = actionCreator<{ error: number }>('GET_USERS_FAILED')

const filterByCountry = actionCreator<{ filteredCountries: [] }>('FILTER_BY_COUNTRY')
const initialState = {
    filteredByCountries: {},
    randomUsers: {}
}

const UserActions = {
    getUsersStarted,
    filterByCountry
}

const getUsersEpic = (action$, state$) =>
    action$.pipe(
        ofType(getUsersStarted),
        mergeMap(
            (result) => {
                const createGetRequest = createGetRequestFactory(
                    state$.value.config.apiBaseUrl
                )
                return from(createGetRequest(
                    `get_users`
                )).pipe(
                    map(
                        (result: any) => getUsersResult({
                            randomUsers: result
                        })
                    ),
                    catchError(error => of(getUsersFailed({error: error})))
                )
            }
        )
    )

const UsersEpic = combineEpics(
    getUsersEpic
)

const createReducer = () =>
    (state = initialState, action: Action) => {
        if (isType(action, filterByCountry)) {
            return {
                ...state,
                filteredByCountries: action.payload
            }
        }
        if (isType(action, getUsersStarted)) {
            return {
                ...state,
                loading: true
            }
        } else if (isType(action, getUsersResult)) {
            return {
                ...state,
                randomUsers: action.payload.randomUsers.data

            }
        } else if (isType(action, getUsersFailed)) {
            return {
                ...state,
                error: action.payload.error
            }
        }
        return state
    }

export {
    UsersEpic,
    UserActions as action,
    createReducer
}

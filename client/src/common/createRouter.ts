import {ConnectedRouter} from 'connected-react-router'
import {h} from 'react-hyperscript-helpers'
import {PersistGate} from 'redux-persist/lib/integration/react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {Provider} from 'react-redux'
import {Store} from 'redux'
import {createPersistStore} from 'common/store'
import UsersContainer from "components/container/users";


interface Prop {
  history: any
}

const AppRouter = ({ history }: Prop) =>
    h(
        ConnectedRouter,
        {history},
        [
            h(
                Switch,
                [
                    h(
                        Redirect,
                        {
                            exact: true,
                            from: '/users',
                            to: '/'
                        }
                    ),
                    h(
                        Route,
                        {
                            path: '/',
                            render: (props) => h(UsersContainer, {...props})
                        }
                    )
                ]
            )
        ]
    )

const createRouter = (history: any, store: Store) =>
    h(
     Provider,
     { store },
       [
           h(
               PersistGate,
               { persistor: createPersistStore(store) },
               [
                   h(AppRouter, { history })
               ]
           )
       ]
     )

export default createRouter



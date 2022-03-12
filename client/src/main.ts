import {createBrowserHistory} from 'history'
import {render} from 'react-dom'
import {h} from 'react-hyperscript-helpers'

import createRouter from 'common/createRouter'
import environment from 'common/environment'
import {createStore} from 'common/store'

import 'style/main.less'

const basename = environment.release ? environment.BASE_NAME : undefined
const history = createBrowserHistory({basename})
const store = createStore(history, environment.API_URL)
console.log(environment.API_URL)


const App = () =>
    createRouter(history, store)

render(
    h(App),
    document.getElementById('app')
)

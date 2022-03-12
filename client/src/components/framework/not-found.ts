import {p} from 'react-hyperscript-helpers'
import {connect} from 'react-redux'


const NotFound = (props) =>
  p(`Error: Could not match path "${props.router.location.pathname}" to route`)

const mapStateToProps = (state) => ({
  router: state.router
})

export default connect(mapStateToProps)(NotFound)

import classNames from 'classnames'
import {ReactChildren} from 'react'
import {div, hh} from 'react-hyperscript-helpers'

import './style.less'


interface Prop {
  isPrivileged: boolean
  children: ReactChildren
  className: string
  vertical: boolean
}

const View = (props: Prop) =>
  div(
    '.view',
    {
      className: classNames(
        props.className,
        {
          privileged: props.isPrivileged,
          vertical: props.vertical
        }
      )
    },
    [ props.children ]
  )

const view = hh(View)

export default view
export { View }

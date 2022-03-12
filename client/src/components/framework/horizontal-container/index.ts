import {ReactChildren} from 'react'
import {div, hh} from 'react-hyperscript-helpers'

import './style.less'


interface Prop {
  children: ReactChildren
  className: string
}

const HorizontalContainer = (props: Prop) =>
  div(
    '.horizontalContainer',
    { className: props.className },
    [ props.children ]
  )

const horizontalContainer = hh(HorizontalContainer)

export default horizontalContainer
export { HorizontalContainer }

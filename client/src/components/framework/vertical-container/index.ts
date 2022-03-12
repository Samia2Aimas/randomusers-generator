import {ReactChildren} from 'react'
import {div, hh} from 'react-hyperscript-helpers'

import './style.less'


interface Prop {
  children: ReactChildren
  className: string
}

const VerticalContainer = (props: Prop) =>
  div(
    '.verticalContainer',
    { className: props.className },
    [ props.children ]
  )

const verticalContainer = hh(VerticalContainer)

export default verticalContainer
export { VerticalContainer }

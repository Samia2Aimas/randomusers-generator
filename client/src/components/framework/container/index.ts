import {ReactChildren} from 'react'
import {div, hh} from 'react-hyperscript-helpers'

import './style.less'


interface Prop {
  children: ReactChildren
  className: string
}

const Container = (props: Prop) =>
  div(
    '.container',
    { className: props.className },
    [ props.children ]
  )

const container = hh(Container)

export default container
export { Container }

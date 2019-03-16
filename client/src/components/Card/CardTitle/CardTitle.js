import React from 'react'
import cx from 'class-names'
import PropTypes from 'prop-types'
import Icon from '@mdi/react'
import { mdiDotsVertical, mdiClose } from '@mdi/js'

const CardTitle = ({ children, className, reveal, closeReveal, style }) => (
  <span
    className={cx(
      'card-title',
      {
        activator: reveal,
      },
      className
    )}
    style={style}
  >
    {children}
    {/* <i className="material-icons right">more_vert</i> */}
    {/* <Icon className="right" path={mdiDotsVertical} size={1} /> */}
    {reveal && <Icon className="right" path={mdiDotsVertical} size={1.25} />}
    {closeReveal && <Icon className="right" path={mdiClose} size={1.25} />}
  </span>
)

CardTitle.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  reveal: PropTypes.bool,
  closeReveal: PropTypes.bool,
}

export default CardTitle

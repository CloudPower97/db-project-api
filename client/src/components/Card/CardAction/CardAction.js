import React from 'react'
import cx from 'class-names'
import PropTypes from 'prop-types'

const CardAction = ({ children, className, style }) => (
  <div className={cx('card-action', className)} style={style}>
    {children}
  </div>
)

CardAction.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object,
}

export default CardAction

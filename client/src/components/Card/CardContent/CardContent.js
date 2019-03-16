import React from 'react'
import cx from 'class-names'
import PropTypes from 'prop-types'

const CardContent = ({ children, className, style }) => (
  <div className={cx('card-content', className)} style={style}>
    {children}
  </div>
)

CardContent.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
}

export default CardContent

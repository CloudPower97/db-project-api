import React from 'react'
import PropTypes from 'prop-types'

const CardTabs = ({ children }) => <div className="card-tabs">{children}</div>

CardTabs.propTypes = {
  children: PropTypes.node,
}

export default CardTabs

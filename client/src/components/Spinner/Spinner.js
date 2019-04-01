import React from 'react'
import PropTypes from 'prop-types'
import { Preloader } from 'react-materialize'
import cx from 'class-names'
import Style from './Spinner.module.css'

const Spinner = ({ className }) => (
  <div className={cx(Style.SpinnerContainer, className)}>
    <Preloader />
  </div>
)

Spinner.propTypes = {
  className: PropTypes.string,
}

export default Spinner

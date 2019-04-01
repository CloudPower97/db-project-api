import React from 'react'
import { Preloader } from 'react-materialize'
import cx from 'class-names'
import Style from './Spinner.module.css'

const Spinner = ({ className }) => (
  <div className={cx(Style.SpinnerContainer, className)}>
    <Preloader />
  </div>
)

export default Spinner

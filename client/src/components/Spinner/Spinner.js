import React from 'react'
import { Preloader } from 'react-materialize'
import Style from './Spinner.module.css'

const Spinner = () => (
  <div className={Style.SpinnerContainer}>
    <Preloader />
  </div>
)

export default Spinner

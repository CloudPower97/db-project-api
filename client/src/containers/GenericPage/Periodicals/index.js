import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import Helmet from 'react-helmet'
import SearchPage from 'containers/SearchPage'
import ChoosePage from 'containers/ChoosePage'
import ResultsPage from 'containers/ResultsPage'
import ErrorPage from 'containers/ErrorPage'
import PeriodicalPage from './PeriodicalPage'

const Periodicals = ({ match: { path } }) => (
  <>
    <Helmet>
      <meta name="theme-color" content="#A31621" />
    </Helmet>
    <Switch>
      <Route exact path={path} component={ResultsPage} />
      <Route path={`${path}/search`} component={SearchPage} />
      <Route path={`${path}/choose`} component={ChoosePage} />
      <Route path={`${path}/error`} component={ErrorPage} />
      <Route exact path={`${path}/:id`} component={PeriodicalPage} />
    </Switch>
  </>
)

Periodicals.propTypes = {
  match: PropTypes.object,
}

export default Periodicals

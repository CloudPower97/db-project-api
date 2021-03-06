import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect } from 'react-router-dom'
import Helmet from 'react-helmet'
import ErrorPage from 'containers/ErrorPage'
import SearchPage from 'containers/SearchPage'
import ResultsPage from 'containers/ResultsPage'
import ChoosePage from 'containers/ChoosePage'
import AuthorPage from './AuthorPage'

const Authors = ({ match: { path } }) => (
  <>
    <Helmet>
      <meta name="theme-color" content="#f98012" />
    </Helmet>
    <Switch>
      <Route exact path={path} component={ResultsPage} />
      <Route path={`${path}/search`} component={SearchPage} />
      <Route path={`${path}/choose`} component={ChoosePage} />
      <Route path={`${path}/error`} component={ErrorPage} />
      <Route exact path={`${path}/:ORCID`} component={AuthorPage} />
      <Redirect to={`${path}/choose`} />
    </Switch>
  </>
)

Authors.propTypes = {
  match: PropTypes.object,
}

export default Authors

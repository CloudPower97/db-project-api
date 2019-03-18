import React from 'react'
import { Switch, Route } from 'react-router-dom'
import SearchPage from 'containers/SearchPage'
import ChoosePage from 'containers/ChoosePage'
import ResultsPage from 'containers/ResultsPage'
import ErrorPage from 'containers/ErrorPage'

const Author = ({ match: { path } }) => (
  <>
    <Switch>
      <Route exact path={path} component={ResultsPage} />
      <Route path={`${path}/search`} component={SearchPage} />
      <Route path={`${path}/choose`} component={ChoosePage} />
      <Route path={`${path}/error`} component={ErrorPage} />
      <Route exact path={`${path}/:id`} render={() => <h1>Pagina periodico</h1>} />
    </Switch>
  </>
)

export default Author

import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import SearchPage from './search'
import Results from './results'
import ChoosePage from 'containers/ChoosePage'

const Author = ({ match: { path } }) => (
  <>
    <Switch>
      <Route exact path={path} component={Results} />
      <Route path={`${path}/search`} component={SearchPage} />
      <Route path={`${path}/choose`} component={ChoosePage} />
      <Route exact path={`${path}/:ORCID`} render={() => <h1>Pagina autore</h1>} />
      <Redirect to={`${path}/choose`} />
    </Switch>
  </>
)

export default Author

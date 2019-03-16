import React from 'react'
import { Switch, Route } from 'react-router-dom'
import SearchPage from './search'
import ChoosePage from 'containers/ChoosePage'
import Results from './results'

const Author = ({ match: { path } }) => (
  <>
    <Switch>
      <Route exact path={path} component={Results} />
      <Route path={`${path}/search`} component={SearchPage} />
      <Route path={`${path}/choose`} component={ChoosePage} />
      <Route exact path={`${path}/:id`} render={() => <h1>Pagina Conferenza</h1>} />
    </Switch>
  </>
)

export default Author

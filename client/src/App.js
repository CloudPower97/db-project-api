import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import Layout from 'hoc/Layout'
import Home from 'containers/Home'
import GenericPage from 'containers/GenericPage'

const App = () => (
  <Layout>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route
        path="/(authors|conferences|documents|organizations|periodicals|publishing-companies)"
        component={GenericPage}
      />
      <Redirect to="/" />
    </Switch>
  </Layout>
)

export default App

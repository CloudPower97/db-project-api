import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import Layout from 'hoc/Layout'
import Home from 'containers/Home'
import GenericPage from 'containers/GenericPage'
import LearnMore from 'containers/LearnMore'

const App = () => (
  <Layout>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route
        path="/(authors|conferences|documents|organizations|periodicals|publishing-companies)"
        component={GenericPage}
      />
      <Route exact path="/learn-more" component={LearnMore} />
      <Redirect to="/" />
    </Switch>
  </Layout>
)

export default App

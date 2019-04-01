import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import Helmet from 'react-helmet'
import toCapitalCase from 'to-capital-case'
import Authors from './Authors'
import Conferences from './Conferences'
import Documents from './Documents'
import Organizations from './Organizations'
import Periodicals from './Periodicals'
import PublishingCompanies from './PublishingCompanies'

const GenericPage = ({ match: { url } }) => (
  <>
    <Helmet>
      <title>{toCapitalCase(url.split('/')[1])}</title>
    </Helmet>
    <Switch>
      <Route path="/authors" component={Authors} />
      <Route path="/conferences" component={Conferences} />
      <Route path="/documents" component={Documents} />
      <Route path="/organizations" component={Organizations} />
      <Route path="/periodicals" component={Periodicals} />
      <Route path="/publishing-companies" component={PublishingCompanies} />
    </Switch>
  </>
)

GenericPage.propTypes = {
  match: PropTypes.object,
}

export default GenericPage

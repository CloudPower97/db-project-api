import React, { lazy, Suspense } from 'react'
import { Section } from 'react-materialize'
import Banner from 'components/Banner'
import Button from 'components/Button'
import { mdiMagnify } from '@mdi/js'
import Icon from '@mdi/react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import cx from 'class-names'
import Styles from './SearchPage.module.css'
import qs from 'querystring'
import Spinner from 'components/Spinner'

const AuthorsSearch = lazy(() => import('components/AuthorsSearch'))
const ConferencesSearch = lazy(() => import('components/ConferencesSearch'))
const DocumentsSearch = lazy(() => import('components/DocumentsSearch'))
const OrganizationsSearch = lazy(() => import('components/OrganizationsSearch'))
const PeriodicalsSearch = lazy(() => import('components/PeriodicalsSearch'))
const PublishingCompaniesSearch = lazy(() => import('components/PublishingCompaniesSearch'))

const SearchPage = ({ match: { path }, children, search }) => {
  const collection = path.split('/')[1]

  const pages = {
    authors: <AuthorsSearch />,
    conferences: <ConferencesSearch />,
    documents: <DocumentsSearch />,
    organizations: <OrganizationsSearch />,
    periodicals: <PeriodicalsSearch />,
    'publishing-companies': <PublishingCompaniesSearch />,
  }

  return (
    <div className={cx('grey lighten-4 search-page', collection)}>
      <Banner text={`Search for ${collection.replace('-', ' ')}`} />

      <Suspense fallback={<Spinner />}>
        <>
          {pages[collection]}
          <Section className="center">
            <Link
              to={{
                pathname: `/${collection}`,
                search: qs.stringify(search),
              }}>
              <Button large className={cx(Styles.SearchButton, collection)}>
                <Icon size={1.25} path={mdiMagnify} color="white" /> Search
              </Button>
            </Link>
          </Section>
        </>
      </Suspense>
    </div>
  )
}

export default withRouter(SearchPage)

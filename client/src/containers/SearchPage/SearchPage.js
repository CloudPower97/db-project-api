import React, { lazy, Suspense } from 'react'
import PropTypes from 'prop-types'
import Banner from 'components/Banner'
import { withRouter } from 'react-router-dom'
import cx from 'class-names'
import Spinner from 'components/Spinner'
import Helmet from 'react-helmet'
import Styles from './SearchPage.module.css'

const AuthorsSearch = lazy(() => import('components/AuthorsSearch'))
const ConferencesSearch = lazy(() => import('components/ConferencesSearch'))
const DocumentsSearch = lazy(() => import('components/DocumentsSearch'))
const OrganizationsSearch = lazy(() => import('components/OrganizationsSearch'))
const PeriodicalsSearch = lazy(() => import('components/PeriodicalsSearch'))
const PublishingCompaniesSearch = lazy(() => import('components/PublishingCompaniesSearch'))

const SearchPage = ({ match: { path } }) => {
  const collection = path.split('/')[1]

  const pages = {
    authors: <AuthorsSearch className={Styles.SearchWrapper} />,
    conferences: <ConferencesSearch className={Styles.SearchWrapper} />,
    documents: <DocumentsSearch className={Styles.SearchWrapper} />,
    organizations: <OrganizationsSearch className={Styles.SearchWrapper} />,
    periodicals: <PeriodicalsSearch className={Styles.SearchWrapper} />,
    'publishing-companies': <PublishingCompaniesSearch className={Styles.SearchWrapper} />,
  }

  return (
    <>
      <Helmet>
        <title>Search for {collection}</title>
      </Helmet>
      <div className={cx('grey lighten-4 search-page', collection)}>
        <Banner text={`Search for ${collection.replace('-', ' ')}`} />

        <Suspense fallback={<Spinner className={collection} />}>{pages[collection]}</Suspense>
      </div>
    </>
  )
}

SearchPage.propTypes = {
  match: PropTypes.object,
}

export default withRouter(SearchPage)

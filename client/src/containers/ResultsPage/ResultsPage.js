import React, { lazy, Suspense } from 'react'
import Spinner from 'components/Spinner'
import Banner from 'components/Banner'
import { withRouter } from 'react-router-dom'
import withData from 'hoc/withData'

const AuthorsTable = lazy(() => import('components/AuthorsTable'))
const ConferencesTable = lazy(() => import('components/ConferencesTable'))
const DocumentsTable = lazy(() => import('components/DocumentsTable'))
const PeriodicalsTable = lazy(() => import('components/PeriodicalsTable'))
const PublishingCompaniesTable = lazy(() => import('components/PublishingCompaniesTable'))
const OrganizationsTable = lazy(() => import('components/OrganizationsTable'))

const Results = props => {
  const { data } = props
  const {
    location: { pathname, search },
  } = props

  const collection = pathname.split('/').pop()

  let text = `All ${collection}`

  const tables = {
    authors: <AuthorsTable data={data} />,
    conferences: <ConferencesTable data={data} />,
    documents: <DocumentsTable data={data} />,
    organizations: <OrganizationsTable data={data} />,
    periodicals: <PeriodicalsTable data={data} />,
    'publishing-companies': <PublishingCompaniesTable data={data} />,
  }

  if (search) {
    text = (data && `${data.length} ${collection} found`) || `Searching ${collection}...`
  }

  return (
    <>
      <Banner text={text} />
      <Suspense fallback={<Spinner />}>{tables[collection]}</Suspense>
    </>
  )
}

export default withData(withRouter(Results))

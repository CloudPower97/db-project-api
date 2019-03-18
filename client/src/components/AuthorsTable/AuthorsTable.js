import React from 'react'
import { Link } from 'react-router-dom'
import ReactTable from 'react-table'
import Spinner from 'components/Spinner'
import cx from 'class-names'

const AuthorsTable = ({ data, className }) => {
  const columns = [
    {
      id: 'author',
      Header: 'Author',
      accessor: d => `${d.name} ${d.surname}`,
      Cell: props => {
        return <Link to={`/authors/${props.original.ORCID}`}>{props.value}</Link>
      },
    },
    {
      Header: 'Documents',
      accessor: 'documents_count',
    },
    {
      id: 'organization',
      Header: 'Organization',
      accessor: d => d.Organization.name,
      Cell: props => (
        <Link to={`/organizations/${props.original.Organization.id}`}>{props.value}</Link>
      ),
    },
  ]

  if (data) {
    return (
      <ReactTable
        className={cx('-striped', className)}
        data={data}
        columns={columns}
        showPaginationTop
      />
    )
  } else {
    return <Spinner />
  }
}

export default AuthorsTable

import React from 'react'
import PropTypes from 'prop-types'
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
      // eslint-disable-next-line react/display-name
      Cell: props => (
        // eslint-disable-next-line react/prop-types
        <Link to={`/authors/${props.original.ORCID}`}>{props.value}</Link>
      ),
    },
    {
      Header: 'Documents',
      accessor: 'documents_count',
    },
    {
      id: 'organization',
      Header: 'Organization',
      accessor: d => d.Organization.name,
      // eslint-disable-next-line react/display-name
      Cell: props => (
        // eslint-disable-next-line react/prop-types
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
    return <Spinner className="authors" />
  }
}

AuthorsTable.propTypes = {
  data: PropTypes.array,
  className: PropTypes.string,
}

export default AuthorsTable

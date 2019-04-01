import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import ReactTable from 'react-table'
import Spinner from 'components/Spinner'
import cx from 'class-names'

const OrganizationsTable = ({ data, className }) => {
  const columns = [
    {
      Header: 'Name',
      accessor: 'name',
      // eslint-disable-next-line react/display-name
      Cell: props => (
        // eslint-disable-next-line react/prop-types
        <Link to={`/organizations/${props.original.id}`}>{props.value}</Link>
      ),
    },
    {
      Header: 'Location',
      accessor: 'location',
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
    return <Spinner className="organizations" />
  }
}

OrganizationsTable.propTypes = {
  data: PropTypes.array,
  className: PropTypes.string,
}

export default OrganizationsTable

import React from 'react'
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
      Cell: props => <Link to={`/organizations/${props.original.id}`}>{props.value}</Link>,
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

export default OrganizationsTable

import React from 'react'
import { Link } from 'react-router-dom'
import ReactTable from 'react-table'
import Spinner from 'components/Spinner'
import cx from 'class-names'

const PublishingCompaniesTable = ({ data, className }) => {
  const columns = [
    {
      Header: 'Name',
      accessor: 'name',
      Cell: props => <Link to={`/publishing-companies/${props.original.id}`}>{props.value}</Link>,
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

export default PublishingCompaniesTable

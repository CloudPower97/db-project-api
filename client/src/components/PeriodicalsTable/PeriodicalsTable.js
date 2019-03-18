import React from 'react'
import { Link } from 'react-router-dom'
import ReactTable from 'react-table'
import Spinner from 'components/Spinner'
import cx from 'class-names'

const AuthorsTable = ({ data, className }) => {
  const columns = [
    {
      Header: 'Name',
      accessor: 'title',
      Cell: props => {
        return <Link to={`/periodicals/${props.original.id}`}>{props.value}</Link>
      },
    },
    {
      id: 'publishing-company',
      Header: 'Publishing Company',
      accessor: d => d.PublishingCompany.name,
      Cell: props => {
        return (
          <Link to={`/publishing-companies/${props.original.PublishingCompany.id}`}>
            {props.value}
          </Link>
        )
      },
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

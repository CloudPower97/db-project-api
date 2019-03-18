import React from 'react'
import { Link } from 'react-router-dom'
import ReactTable from 'react-table'
import Spinner from 'components/Spinner'
import cx from 'class-names'

const ConferencesTable = ({ data, className }) => {
  const columns = [
    {
      Header: 'Conference',
      accessor: 'name',
      Cell: props => {
        console.log(props)
        return <Link to={`/conferences/${props.original.id}`}>{props.value}</Link>
      },
    },
    {
      Header: 'Date',
      accessor: 'date',
      Cell: props => {
        return new Date(props.value).toDateString()
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

export default ConferencesTable

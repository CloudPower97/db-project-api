import React from 'react'
import { Link } from 'react-router-dom'
import ReactTable from 'react-table'
import Spinner from 'components/Spinner'
import cx from 'class-names'

const DocumentsTable = ({ data, className }) => {
  const columns = [
    {
      Header: 'Document title',
      accessor: 'title',
      Cell: props => {
        return <Link to={`/documents/${props.original.id}`}>{props.value}</Link>
      },
    },
    {
      Header: 'Pages',
      accessor: 'number_of_pages',
    },
    {
      id: 'publisher',
      Header: 'Publisher',
      accessor: d => d.Number.Periodical.PublishingCompany.name,
      Cell: props => {
        return (
          <Link
            to={`/publishing-companies/${props.original.Number.Periodical.PublishingCompany.id}`}
          >
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
        filterable
      />
    )
  } else {
    return <Spinner />
  }
}

export default DocumentsTable

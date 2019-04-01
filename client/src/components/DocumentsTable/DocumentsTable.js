import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import ReactTable from 'react-table'
import Spinner from 'components/Spinner'
import cx from 'class-names'

const DocumentsTable = ({ data, className }) => {
  const columns = [
    {
      Header: 'Document title',
      accessor: 'title',
      // eslint-disable-next-line react/display-name
      Cell: props => (
        // eslint-disable-next-line react/prop-types
        <Link to={`/documents/${props.original.id}`}>{props.value}</Link>
      ),
    },
    {
      Header: 'Pages',
      accessor: 'number_of_pages',
    },
    {
      id: 'publisher',
      Header: 'Publisher',
      accessor: d => d.Number.Periodical.PublishingCompany.name,
      // eslint-disable-next-line react/display-name
      Cell: props => (
        // eslint-disable-next-line react/prop-types
        <Link to={`/publishing-companies/${props.original.Number.Periodical.PublishingCompany.id}`}>
          {
            // eslint-disable-next-line react/prop-types
            props.value
          }
        </Link>
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
        filterable
      />
    )
  } else {
    return <Spinner className="documents" />
  }
}

DocumentsTable.propTypes = {
  data: PropTypes.array,
  className: PropTypes.string,
}

export default DocumentsTable

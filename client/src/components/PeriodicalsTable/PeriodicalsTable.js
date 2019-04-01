import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import ReactTable from 'react-table'
import Spinner from 'components/Spinner'
import cx from 'class-names'

const PeriodicalsTable = ({ data, className }) => {
  const columns = [
    {
      Header: 'Name',
      accessor: 'title',
      // eslint-disable-next-line react/display-name
      Cell: props => (
        // eslint-disable-next-line react/prop-types
        <Link to={`/periodicals/${props.original.id}`}>{props.value}</Link>
      ),
    },
    {
      id: 'publishing-company',
      Header: 'Publishing Company',
      accessor: d => d.PublishingCompany.name,
      // eslint-disable-next-line react/display-name
      Cell: props => (
        // eslint-disable-next-line react/prop-types
        <Link to={`/publishing-companies/${props.original.PublishingCompany.id}`}>
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
      />
    )
  } else {
    return <Spinner className="periodicals" />
  }
}

PeriodicalsTable.propTypes = {
  data: PropTypes.array,
  className: PropTypes.string,
}

export default PeriodicalsTable

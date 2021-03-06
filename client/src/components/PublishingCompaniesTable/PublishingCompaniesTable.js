import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import ReactTable from 'react-table'
import Spinner from 'components/Spinner'
import cx from 'class-names'

const PublishingCompaniesTable = ({ data, className }) => {
  const columns = [
    {
      Header: 'Name',
      accessor: 'name',
      // eslint-disable-next-line react/display-name
      Cell: props => (
        // eslint-disable-next-line react/prop-types
        <Link to={`/publishing-companies/${props.original.id}`}>{props.value}</Link>
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
    return <Spinner className="publishing-companies" />
  }
}

PublishingCompaniesTable.propTypes = {
  data: PropTypes.array,
  className: PropTypes.string,
}

export default PublishingCompaniesTable

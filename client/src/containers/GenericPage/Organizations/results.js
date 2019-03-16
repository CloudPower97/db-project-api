import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Spinner from 'components/Spinner'
import ReactTable from 'react-table'
import ResultsPage from 'containers/ResultsPage'

export class Results extends Component {
  state = {
    data: null,
  }

  componentDidMount() {
    const { match } = this.props

    axios
      .get(`${match.path}`)
      .then(({ data }) => {
        this.setState({
          data,
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    const { data } = this.state

    let Content = () => {
      if (data) {
        const columns = [
          {
            Header: 'Name',
            accessor: 'name',
            Cell: props => {
              console.log(props)
              return <Link to={`/organizations/${props.original.id}`}>{props.value}</Link>
            },
          },
          {
            Header: 'Location',
            accessor: 'location',
          },
        ]
        return <ReactTable className="-striped" data={data} columns={columns} showPaginationTop />
      } else {
        return <Spinner />
      }
    }

    return (
      <ResultsPage results={data && data.length}>
        <Content />
      </ResultsPage>
    )
  }
}

export default Results

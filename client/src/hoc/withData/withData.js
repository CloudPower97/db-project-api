import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import pluralize from 'pluralize'
import toCamelCase from 'to-camel-case'

const withData = (WrappedComponent, additionalResources) =>
  class WithData extends Component {
    state = {
      data: null,
      error: false,
    }

    getData = ([, collection, id]) => {
      const getCollection = () => {
        axios
          .get(`/api/${collection}/`)
          .then(({ data }) => {
            this.setState({
              data,
              error: typeof data === 'string',
            })
          })
          .catch(() => {
            this.setState({
              error: true,
            })
          })
      }

      const getResource = () => {
        Promise.all([
          axios.get(`/api/${collection}/${id}`),
          ...additionalResources.map(resource => axios.get(`/api/${collection}/${id}/${resource}`)),
        ])
          .then(resource => {
            let data = {
              [`${toCamelCase(pluralize.singular(collection))}`]: resource[0].data,
            }

            resource.slice(1).forEach(resource => {
              data[`${toCamelCase(resource.request.responseURL.split('/').pop())}`] = resource.data
            })

            this.setState({
              data,
              error: typeof data === 'string',
            })
          })
          .catch(() => {
            this.setState({
              error: true,
            })
          })
      }

      switch (collection) {
        case 'authors':
        case 'documents':
        case 'periodicals':
        case 'organizations':
        case 'conferences':
        case 'publishing-companies':
          id ? getResource() : getCollection()
          break

        default:
          return Promise.reject()
      }
    }

    componentDidMount() {
      const { match } = this.props

      this.getData(match.url.split('/'))
    }

    render() {
      const { data, error } = this.state
      const { match } = this.props

      if (error) {
        return <Redirect to={`/${match.url.split('/')[1]}/error`} />
      }

      return <WrappedComponent data={data} {...this.props} />
    }
  }

export default withData

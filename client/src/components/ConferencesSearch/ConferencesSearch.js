import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Section, Container, Row, TextInput } from 'react-materialize'
import DatePicker from 'components/DatePicker'
import SearchButton from 'components/SearchButton'

class SearchConference extends Component {
  static propTypes = {
    className: PropTypes.string,
  }

  state = {}

  render() {
    const { className } = this.props

    return (
      <div className={className}>
        <Section>
          <Container
            className="white"
            style={{
              padding: 12.5,
              borderRadius: 25,
            }}>
            <Row>
              <TextInput
                s={6}
                label="Name"
                onChange={({ target: { value: name } }) => {
                  this.setState({
                    name,
                  })
                }}
              />
              <TextInput
                s={6}
                label="Location"
                onChange={({ target: { value: location } }) => {
                  this.setState({
                    location,
                  })
                }}
              />
              <DatePicker
                s={12}
                label="Conference date"
                onChange={date => {
                  this.setState({
                    date: new Date(date).toISOString(),
                  })
                }}
              />
            </Row>
          </Container>
        </Section>

        <Section className="center">
          <SearchButton
            search={
              Object.keys(this.state).length
                ? `?filter=${Object.entries(this.state)
                    .filter(([, value]) => value.length)
                    .map(([field, value]) => {
                      switch (field) {
                        case 'date':
                          return encodeURIComponent(`${field} eq ${value}`)

                        default:
                          return encodeURIComponent(`${field} iLike %${value}%`)
                      }
                    })
                    .join(',')}`
                : ''
            }
          />
        </Section>
      </div>
    )
  }
}

export default SearchConference

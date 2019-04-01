import React, { Component } from 'react'
import { Section, Container, Row, TextInput } from 'react-materialize'
import SearchButton from 'components/SearchButton'

class SearchAuthor extends Component {
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
                label="name"
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
            </Row>
          </Container>
        </Section>

        <Section className="center">
          <SearchButton
            search={
              Object.keys(this.state).length
                ? `?filter=${Object.entries(this.state)
                    .filter(([, value]) => value.length)
                    .map(([field, value]) => encodeURIComponent(`${field} iLike %${value}%`))
                    .join(',')}`
                : ''
            }
          />
        </Section>
      </div>
    )
  }
}

export default SearchAuthor

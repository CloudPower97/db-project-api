import React, { Component } from 'react'
import { Section, Container, Row, Input } from 'react-materialize'
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
              <Input
                s={6}
                label="First Name"
                onChange={({ target: { value: name } }) => {
                  this.setState({
                    name,
                  })
                }}
              />
              <Input
                s={6}
                label="Last Name"
                onChange={({ target: { value: surname } }) => {
                  this.setState({
                    surname,
                  })
                }}
              />
              <Input
                s={12}
                label="Organization"
                onChange={({ target: { value: organization } }) => {
                  this.setState({
                    organization,
                  })
                }}
              />
            </Row>
          </Container>
        </Section>

        <span
          className="center-block center flow-text"
          style={{
            fontFamily: 'Raleway,sans-serif',
          }}>
          OR
        </span>

        <Section>
          <Container
            className="white"
            style={{
              padding: 12.5,
              borderRadius: 25,
            }}>
            <Row>
              <Input
                s={12}
                label="ORCID"
                onChange={({ target: { value: ORCID } }) => {
                  this.setState({
                    ORCID,
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
                    .filter(([value]) => value.length)
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

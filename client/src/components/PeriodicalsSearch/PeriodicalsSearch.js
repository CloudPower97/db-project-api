import React, { Component } from 'react'
import { Section, Container, Row, TextInput } from 'react-materialize'
import SearchButton from 'components/SearchButton'

class SearchPeriodical extends Component {
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
                s={12}
                label="Title"
                onChange={({ target: { value: title } }) => {
                  this.setState({
                    title,
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
              <TextInput
                s={12}
                label="ISSN"
                onChange={({ target: { value: ISSN } }) => {
                  this.setState({
                    ISSN,
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

export default SearchPeriodical

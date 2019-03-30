import React, { Component } from 'react'
import { Section, Container, Row, Input } from 'react-materialize'
import SearchButton from 'components/SearchButton'

class SearchDocument extends Component {
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
                label="Title"
                onChange={({ target: { value: title } }) => {
                  this.setState({
                    title,
                  })
                }}
              />
              <Input
                s={6}
                label="Number of pages"
                type="number"
                onChange={({ target: { value: number_of_pages } }) => {
                  this.setState({
                    number_of_pages,
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
                label="DOI"
                onChange={({ target: { value: DOI } }) => {
                  this.setState({
                    DOI,
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
                      case 'number_of_pages':
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

export default SearchDocument

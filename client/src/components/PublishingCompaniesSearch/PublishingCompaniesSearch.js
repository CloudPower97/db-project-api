import React, { Component } from 'react'
import { Section, Container, Row, Input } from 'react-materialize'
import SearchButton from 'components/SearchButton'

class SearchPublishingCompany extends Component {
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
                s={12}
                label="Title"
                onChange={({ target: { value: name } }) => {
                  this.setState({
                    name,
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

export default SearchPublishingCompany

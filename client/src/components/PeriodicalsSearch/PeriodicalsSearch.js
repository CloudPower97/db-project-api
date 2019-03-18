import React, { Component } from 'react'
import { Section, Container, Row, Input } from 'react-materialize'

class SearchPeriodical extends Component {
  state = {
    title: '',
    issn: '',
  }

  render() {
    return (
      <>
        <Section>
          <Container
            className="white"
            style={{
              padding: 12.5,
              borderRadius: 25,
            }}
          >
            <Row>
              <Input
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
          }}
        >
          OR
        </span>

        <Section>
          <Container
            className="white"
            style={{
              padding: 12.5,
              borderRadius: 25,
            }}
          >
            <Row>
              <Input
                s={12}
                label="ISSN"
                onChange={({ target: { value: issn } }) => {
                  this.setState({
                    issn,
                  })
                }}
              />
            </Row>
          </Container>
        </Section>
      </>
    )
  }
}

export default SearchPeriodical

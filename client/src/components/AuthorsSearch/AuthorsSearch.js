import React, { Component } from 'react'
import { Section, Container, Row, Input } from 'react-materialize'

class SearchAuthor extends Component {
  state = {
    name: '',
    surname: '',
    organization: '',
    orcid: '',
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
            }}>
            <Row>
              <Input
                s={6}
                label="First Name"
                onChange={({ target: { value: name } }) => {
                  this.setState({
                    name: `%${name}%`,
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
                onChange={({ target: { value: orcid } }) => {
                  this.setState({
                    orcid,
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

export default SearchAuthor

import React, { Component } from 'react'
import { Section, Container, Row, Input } from 'react-materialize'
import Button from 'components/Button'
import { mdiMagnify } from '@mdi/js'
import Icon from '@mdi/react'
import { Link } from 'react-router-dom'
import SearchPage from 'containers/SearchPage'

class SearchAuthor extends Component {
  state = {
    name: '',
    surname: '',
    organization: '',
    orcid: '',
  }

  render() {
    return (
      <SearchPage>
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

        <Section className="center">
          <Link to={`/authors?filter=name iLike %${this.state.name}%`}>
            <Button large className="orange-gradient">
              <Icon size={1.25} path={mdiMagnify} color="white" />
              Search
            </Button>
          </Link>
        </Section>
      </SearchPage>
    )
  }
}

export default SearchAuthor

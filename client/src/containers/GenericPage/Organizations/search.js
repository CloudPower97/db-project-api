import React, { Component } from 'react'
import { Section, Container, Row, Input } from 'react-materialize'
import Button from 'components/Button'
import { mdiMagnify } from '@mdi/js'
import Icon from '@mdi/react'
import { Link } from 'react-router-dom'
import SearchPage from 'containers/SearchPage'

class SearchAuthor extends Component {
  state = {
    title: '',
    issn: '',
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
                label="Name"
                onChange={({ target: { value: name } }) => {
                  this.setState({
                    name,
                  })
                }}
              />
              <Input
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
          <Link to={`/organizations?filter=name iLike %${this.state.name}%`}>
            <Button large className="blue-gradient">
              <Icon size={1.25} path={mdiMagnify} color="white" /> Search
            </Button>
          </Link>
        </Section>
      </SearchPage>
    )
  }
}

export default SearchAuthor

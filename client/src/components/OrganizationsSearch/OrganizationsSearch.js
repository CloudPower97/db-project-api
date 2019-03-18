import React, { Component } from "react";
import { Section, Container, Row, Input } from "react-materialize";

class SearchAuthor extends Component {
  state = {
    title: "",
    issn: ""
  };

  render() {
    return (
      <>
        <Section>
          <Container
            className="white"
            style={{
              padding: 12.5,
              borderRadius: 25
            }}
          >
            <Row>
              <Input
                s={6}
                label="Name"
                onChange={({ target: { value: name } }) => {
                  this.setState({
                    name
                  });
                }}
              />
              <Input
                s={6}
                label="Location"
                onChange={({ target: { value: location } }) => {
                  this.setState({
                    location
                  });
                }}
              />
            </Row>
          </Container>
        </Section>
      </>
    );
  }
}

export default SearchAuthor;

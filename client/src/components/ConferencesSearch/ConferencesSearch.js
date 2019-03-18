import React, { Component } from "react";
import { Section, Container, Row, Input } from "react-materialize";

class SearchConference extends Component {
  state = {
    name: "",
    date: "",
    location: ""
  };

  render() {
    return (
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
              s={12}
              label="Title"
              onChange={({ target: { value: title } }) => {
                this.setState({
                  title
                });
              }}
            />
          </Row>
        </Container>
      </Section>
    );
  }
}

export default SearchConference;

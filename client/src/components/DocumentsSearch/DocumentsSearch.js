import React, { Component } from "react";
import { Section, Container, Row, Input } from "react-materialize";

class SearchDocument extends Component {
  state = {
    title: "",
    number_of_pages: "",
    doi: ""
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
                label="Title"
                onChange={({ target: { value: title } }) => {
                  this.setState({
                    title
                  });
                }}
              />
              <Input
                s={6}
                label="Number of pages"
                type="number"
                onChange={({ target: { value: number_of_pages } }) => {
                  this.setState({
                    number_of_pages
                  });
                }}
              />
            </Row>
          </Container>
        </Section>

        <span
          className="center-block center flow-text"
          style={{
            fontFamily: "Raleway,sans-serif"
          }}
        >
          OR
        </span>

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
                label="DOI"
                onChange={({ target: { value: doi } }) => {
                  this.setState({
                    doi
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

export default SearchDocument;

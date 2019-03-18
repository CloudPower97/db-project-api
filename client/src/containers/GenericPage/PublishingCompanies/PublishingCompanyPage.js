import React, { Component } from "react";
import axios from "axios";
import Spinner from "components/Spinner";
import Banner from "components/Banner";
import { Tab, Container, Row, Col, Card, Section } from "react-materialize";
import Tabs from "components/Tabs";
import Styles from "./PublishingCompanyPage.module.css";
import cx from "class-names";
import Icon, { Stack } from "@mdi/react";
import { mdiBookOpenPageVariant, mdiCheckboxBlankCircle } from "@mdi/js";
import PeriodicalsTable from "components/PeriodicalsTable";
import { Redirect } from "react-router-dom";

export class AuthorPage extends Component {
  state = {
    data: null,
    periodicals: [],
    error: false
  };

  fetchDocument() {
    const { match } = this.props;

    axios
      .get(`${match.url}`)
      .then(({ data }) => {
        this.setState({
          data,
          error: typeof data === "string"
        });
      })
      .catch(() => {
        this.setState({
          error: true
        });
      });

    axios
      .get(`${match.url}/periodicals`)
      .then(({ data: periodicals }) => {
        this.setState({
          periodicals
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidMount() {
    this.fetchDocument();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.fetchDocument();
    }
  }

  render() {
    const { data, error, periodicals } = this.state;

    let text = "Fetching publishing company info...";
    let content = <Spinner />;

    if (error) {
      return <Redirect to="/publishing-companies/error" />;
    }

    if (!error && data) {
      text = `${data.name}`;

      content = (
        <Tabs className="tabs-fixed-width z-depth-1">
          <Tab title="Publishing Company" active>
            <Section>
              <Container>
                <Row
                  style={{
                    display: "flex",
                    flexWrap: "wrap"
                  }}
                >
                  <Col s={12} xl={9}>
                    <Card className="rounded large flow-text">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Fusce sed faucibus nunc, eu laoreet urna. Sed urna elit,
                      placerat eget quam id, dignissim elementum metus. Aenean
                      sed ullamcorper quam, in condimentum magna. Donec
                      elementum laoreet erat et gravida. Pellentesque augue
                      orci, volutpat eget lectus ac, pretium gravida quam.
                    </Card>
                  </Col>
                  <Col s={12} xl={3} className={cx(Styles.InfoCardsCol)}>
                    <Card
                      title={
                        <span className="card-title grey-text text-darken-4">
                          <Stack size={1.8}>
                            <Icon
                              path={mdiCheckboxBlankCircle}
                              color="var(--plum)"
                              size={1.8}
                            />
                            <Icon
                              path={mdiBookOpenPageVariant}
                              color="white"
                              size={0.9}
                            />
                          </Stack>
                          Periodicals
                        </span>
                      }
                      className={cx("rounded hoverable", Styles.InfoCard)}
                    >
                      <span className="flow-text">{periodicals.length}</span>
                    </Card>
                  </Col>
                </Row>
              </Container>
            </Section>
          </Tab>
          <Tab title="Periodicals">
            <PeriodicalsTable data={periodicals} className={Styles.Table} />
          </Tab>
        </Tabs>
      );
    }

    return (
      <>
        <Banner text={text} />
        {content}
      </>
    );
  }
}

export default AuthorPage;

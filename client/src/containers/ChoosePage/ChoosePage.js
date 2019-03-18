import React from "react";
import { Container, Row, Col } from "react-materialize";
import { mdiMagnify, mdiArrowRight } from "@mdi/js";
import Banner from "components/Banner";
import FeatureCard from "components/FeatureCard";
import { Link } from "react-router-dom";
import Styles from "./ChoosePage.module.css";
import cx from "class-names";

const ChoosePage = ({ match: { path } }) => {
  const collection = path.split("/")[1];

  return (
    <>
      <Banner text={collection.replace("-", " ")} />

      <Container>
        <h2 className={cx("center", collection, Styles.ChoosePage)}>
          What would you like to do now?
        </h2>

        <Row>
          <Col s={12} l={6}>
            <Link to={`/${collection}/search`}>
              <FeatureCard
                icon={mdiMagnify}
                title={`Look up for ${collection}`}
                className={`${collection}`}
              />
            </Link>
          </Col>
          <Col s={12} l={6}>
            <Link to={`/${collection}`}>
              <FeatureCard
                icon={mdiArrowRight}
                title={`View all ${collection}`}
                className={`${collection}`}
              />
            </Link>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ChoosePage;

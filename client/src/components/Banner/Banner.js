import React from "react";
import PropTypes from "prop-types";
import { Section } from "react-materialize";
import Icon from "@mdi/react";
import cx from "class-names";
import Styles from "./Banner.module.css";
import { withRouter } from "react-router-dom";
import {
  mdiDomain,
  mdiAccountGroup,
  mdiFileDocumentBoxMultipleOutline,
  mdiBookOpenPageVariant,
  mdiCalendarMultiple,
  mdiFeather
} from "@mdi/js";

const Banner = ({
  match: { path },
  className,
  icon,
  iconColor,
  iconSize,
  text,
  textClassName
}) => {
  const collection = path.split("/")[1];

  let fallbackIcon = null;

  switch (collection) {
    case "authors":
      fallbackIcon = mdiAccountGroup;
      break;

    case "conferences":
      fallbackIcon = mdiCalendarMultiple;
      break;

    case "documents":
      fallbackIcon = mdiFileDocumentBoxMultipleOutline;
      break;

    case "organizations":
      fallbackIcon = mdiDomain;
      break;

    case "periodicals":
      fallbackIcon = mdiBookOpenPageVariant;
      break;

    case "publishing-companies":
      fallbackIcon = mdiFeather;
      break;

    default:
      fallbackIcon = mdiAccountGroup;
      break;
  }

  return (
    <Section className={cx("banner", collection, className, Styles.Banner)}>
      <h1 className={cx(textClassName)}>
        <Icon size={iconSize} color={iconColor} path={icon || fallbackIcon} />{" "}
        {text}
      </h1>
    </Section>
  );
};

Banner.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string,
  iconColor: PropTypes.string.isRequired,
  iconSize: PropTypes.number.isRequired,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  textClassName: PropTypes.string.isRequired
};

Banner.defaultProps = {
  textClassName: "white-text",
  iconColor: "white",
  iconSize: 3
};

export default withRouter(Banner);

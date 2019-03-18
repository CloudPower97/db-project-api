import { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { scrollTo } from "libs/utils";

class ScrollToTop extends Component {
  componentDidUpdate(prevProps) {
    const {
      location: { pathname }
    } = this.props;

    if (pathname !== prevProps.location.pathname) {
      scrollTo(null, 56);
    }
  }

  render() {
    const { children } = this.props;

    return children;
  }
}

ScrollToTop.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object.isRequired
};

export default withRouter(ScrollToTop);

import React, { Component, lazy, Suspense } from "react";
import axios from "axios";
import Spinner from "components/Spinner";
import Banner from "components/Banner";
import { withRouter } from "react-router-dom";

const AuthorsTable = lazy(() => import("components/AuthorsTable"));
const ConferencesTable = lazy(() => import("components/ConferencesTable"));
const DocumentsTable = lazy(() => import("components/DocumentsTable"));
const PeriodicalsTable = lazy(() => import("components/PeriodicalsTable"));
const PublishingCompaniesTable = lazy(() =>
  import("components/PublishingCompaniesTable")
);
const OrganizationsTable = lazy(() => import("components/OrganizationsTable"));

export class Results extends Component {
  state = {
    data: null
  };

  componentDidMount() {
    const { match } = this.props;

    axios
      .get(`${match.path}`)
      .then(({ data }) => {
        this.setState({
          data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { data } = this.state;
    const {
      location: { pathname, search }
    } = this.props;

    const collection = pathname.split("/").pop();
    let text = `All ${collection}`;

    const tables = {
      authors: <AuthorsTable data={data} />,
      conferences: <ConferencesTable data={data} />,
      documents: <DocumentsTable data={data} />,
      organizations: <OrganizationsTable data={data} />,
      periodicals: <PeriodicalsTable data={data} />,
      "publishing-companies": <PublishingCompaniesTable data={data} />
    };

    if (search) {
      text =
        (data && `${data.length} ${collection} found`) ||
        `Searching ${collection}...`;
    }

    return (
      <>
        <Banner text={text} />
        <Suspense fallback={<Spinner />}>{tables[collection]}</Suspense>
      </>
    );
  }
}

export default withRouter(Results);

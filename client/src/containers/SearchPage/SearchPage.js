import React from 'react'
import Banner from 'components/Banner'
import { withRouter } from 'react-router-dom'

const ChoosePage = ({ match: { path }, children }) => {
  const collection = path.split('/')[1]

  return (
    <div className="grey lighten-4 search-page">
      <Banner text={`Search for ${collection.replace('-', ' ')}`} />

      <h2 className="center">What would you like to do now?</h2>

      {children}
    </div>
  )
}

export default withRouter(ChoosePage)

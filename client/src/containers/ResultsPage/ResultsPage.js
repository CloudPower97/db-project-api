import React from 'react'
import Banner from 'components/Banner'
import { withRouter } from 'react-router-dom'

export const Results = ({ results, match: { path }, location: { search }, children }) => {
  const collection = path.split('/')[1]
  let text = ''

  if (search) {
    text = (results && `${results} ${collection} found`) || `Searching ${collection}...`
  } else {
    text = `All ${collection}`
  }

  return (
    <>
      <Banner text={text} className="orange-gradient" />

      {children}
    </>
  )
}

export default withRouter(Results)

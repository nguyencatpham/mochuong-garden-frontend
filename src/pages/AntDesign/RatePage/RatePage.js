import React from 'react'
import Page from 'components/Page'
import Helmet from 'react-helmet'
import RatePageItems from 'components/AntDesign/RatePage/index'

class RatePage extends React.Component {
  static defaultProps = {
    pathName: 'Button',
  }

  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title="Clean UI - Buttons" />
        <RatePageItems />
      </Page>
    )
  }
}

export default RatePage

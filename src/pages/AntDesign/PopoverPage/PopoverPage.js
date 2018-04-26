import React from 'react'
import Page from 'components/Page'
import Helmet from 'react-helmet'
import PopoverPageItems from 'components/AntDesign/PopoverPage/index'

class PopoverPage extends React.Component {
  static defaultProps = {
    pathName: 'Popover',
  }

  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title="Clean UI - Popover" />
        <PopoverPageItems />
      </Page>
    )
  }
}

export default PopoverPage

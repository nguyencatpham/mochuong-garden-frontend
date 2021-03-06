import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import AddNew from './addNew'

class DefaultPage extends React.Component {
  static defaultProps = {
    pathName: 'Things',
    roles: ['agent', 'administrator'],
  }
  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title="Things" />
        <AddNew history={props.history} location={props.location} match={props.match}/>
      </Page>
    )
  }
}

export default DefaultPage
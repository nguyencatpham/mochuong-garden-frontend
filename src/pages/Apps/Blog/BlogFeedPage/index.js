import React from 'react'
import Page from 'components/Page'
import Helmet from 'react-helmet'
import BlogFeed from './BlogFeed'

class BlogFeedPage extends React.Component {
  static defaultProps = {
    pathName: 'Blog Feed',
  }

  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title="Clean UI - Blog Feed" />
        <BlogFeed />
      </Page>
    )
  }
}

export default BlogFeedPage
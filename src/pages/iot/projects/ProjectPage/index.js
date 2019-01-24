import React from 'react'
import { mapStateToProps, mapDispathToProps } from '../container'
import { connect } from 'react-redux'
import LockScreenPage from '../../../DefaultPages/LockscreenPage/Lockscreen'
import '../../../../resources/style.scss'
import ProjectCard from '../../../components/ProjectCard'

@connect(
  mapStateToProps,
  mapDispathToProps,
)
class ProjectPage extends React.Component {
  state = {
    current: 0,
  }
  componentWillMount() {
    const { getList } = this.props
    getList()
  }

  render() {
    const { data, totalItems, remove, history } = this.props
    const { current } = this.state

    return (
      <div className="row">
        {data &&
          data.map(x => (
            <div className="col-md-3" key={x.id}>
              <ProjectCard
                project={x || {}}
                type={current === 0 ? 'primary' : ''}
                onMouseEnter={() => this.setState({ current: 0 })}
                remove={remove}
                push={history.push}
              />
            </div>
          ))}
        {(!totalItems || totalItems <= 0) && (
          <div className="col-md-12 row">
            <div className="col-md-4" />
            <LockScreenPage className="col-md-4" name="Project" link="#/projects/create" />
            <div className="col-md-4" />
          </div>
        )}
      </div>
    )
  }
}

export default ProjectPage

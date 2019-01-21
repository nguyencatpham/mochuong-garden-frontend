import React from 'react'
import { mapStateToProps, mapDispathToProps } from '../container'
import { connect } from 'react-redux'
import ButtonStep from '../../../components/buttonStep'
import StepProgress from '../../../components/stepProgress'
import DetailPage from '../DetailPage/detail'
import ServicePage from './services'
import ActionPage from './actions'
import ResourcePage from './resources'
import Review from './review'

@connect(
  mapStateToProps,
  mapDispathToProps,
)
class CreatePage extends React.Component {
  constructor(props) {
    super(props)
    this.changeStepState = this.changeStepState.bind(this)
    this.state = {
      step: {
        current: 0,
      },
      policy: {
        name: '',
        type: '',
        confirm: '',
        groups: {},
      },
    }
  }
  componentWillMount() {
    const { getProjects } = this.props
    getProjects(100)
  }
  changeStepState(current) {
    const { create, policyCreate } = this.props
    if (current === 4) {
      console.log(policyCreate)
      create(policyCreate, true)
    }
    this.setState({
      step: {
        current: current,
      },
    })
  }

  render() {
    const { current } = this.state.step
    const { steps } = this.props
    return (
      <div className="policy-create">
        <StepProgress steps={steps} current={current} type="POLICY" />
        <div className="card">
          <div className="card-header">
            <h4 className="text-black mb-3">
              <strong>{steps[current].subTitle}</strong>
            </h4>
          </div>
          <div className="card-body">
            {current === 0 && <DetailPage />}
            {current === 1 && <ActionPage />}
            {current === 2 && <ResourcePage />}
            {current >= 3 && <Review />}
            <ButtonStep
              steps={steps}
              current={current}
              link="/policies"
              changeStepState={this.changeStepState}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default CreatePage

import React from 'react'
import ReactDOM from 'react-dom'
import SyntaxHighlighter from 'react-syntax-highlighter/prism'
import { base16AteliersulphurpoolLight } from 'react-syntax-highlighter/styles/prism'
import { Collapse, Icon } from 'antd'

import { default as renderInputnumberBasic } from './Basic/index.js'
import { default as renderInputnumberDigit } from './Digit/index.js'
import { default as renderInputnumberDisabled } from './Disabled/index.js'
import { default as renderInputnumberFormatter } from './Formatter/index.js'
import { default as renderInputnumberSize } from './Size/index.js'

const Panel = Collapse.Panel

class InputnumberItems extends React.Component {
  componentDidMount() {
    renderInputnumberBasic(ReactDOM, document.getElementById('InputnumberBasic'))
    renderInputnumberDigit(ReactDOM, document.getElementById('InputnumberDigit'))
    renderInputnumberDisabled(ReactDOM, document.getElementById('InputnumberDisabled'))
    renderInputnumberFormatter(ReactDOM, document.getElementById('InputnumberFormatter'))
    renderInputnumberSize(ReactDOM, document.getElementById('InputnumberSize'))
  }

  render() {
    return (
      <div className="InputnumberDemo">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <h5 className="mb-0 mr-3 d-inline-block text-black">
                  <strong>InputNumber</strong>
                </h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="card" id="components-input-number-demo-basic">
                      <div className="card-header">
                        <h5 className="mb-0 mr-3 d-inline-block text-black">
                          <strong className="text-capitalize">Basic</strong>
                        </h5>
                      </div>
                      <div className="cat__ant-component-collapse-descr">
                        <Collapse bordered={false} defaultActiveKey={['1']}>
                          <Panel
                            header={
                              <span>
                                <Icon
                                  style={{ fontSize: 16, color: '#9f9f9f' }}
                                  type="info-circle-o"
                                />
                                <span className="ml-2 text-primary">Description</span>
                              </span>
                            }
                            key="1"
                            showArrow={false}
                          >
                            <div>Numeric-only input box.</div>
                          </Panel>
                          <Panel
                            header={
                              <span>
                                <i
                                  className="fa fa-code"
                                  style={{ fontSize: 16, color: '#9f9f9f' }}
                                />
                                <span className="ml-2 text-primary">Show Code</span>
                              </span>
                            }
                            key="2"
                            showArrow={false}
                          >
                            <SyntaxHighlighter
                              language="jsx"
                              style={base16AteliersulphurpoolLight}
                              useInlineStyles={true}
                            >
                              {`import \{ InputNumber \} from 'antd';

function onChange(value) \{
  console.log('changed', value);
\}

ReactDOM.render(
  <InputNumber min=\{1\} max=\{10\} defaultValue=\{3\} onChange=\{onChange\} />
, mountNode);
`}
                            </SyntaxHighlighter>
                          </Panel>
                        </Collapse>
                      </div>
                      <div className="card-body">
                        <div id="InputnumberBasic" />
                      </div>
                    </div>
                    <div className="card" id="components-input-number-demo-disabled">
                      <div className="card-header">
                        <h5 className="mb-0 mr-3 d-inline-block text-black">
                          <strong className="text-capitalize">Disabled</strong>
                        </h5>
                      </div>
                      <div className="cat__ant-component-collapse-descr">
                        <Collapse bordered={false} defaultActiveKey={['1']}>
                          <Panel
                            header={
                              <span>
                                <Icon
                                  style={{ fontSize: 16, color: '#9f9f9f' }}
                                  type="info-circle-o"
                                />
                                <span className="ml-2 text-primary">Description</span>
                              </span>
                            }
                            key="1"
                            showArrow={false}
                          >
                            <div>
                              Click the button to toggle between available and disabled states.
                            </div>
                          </Panel>
                          <Panel
                            header={
                              <span>
                                <i
                                  className="fa fa-code"
                                  style={{ fontSize: 16, color: '#9f9f9f' }}
                                />
                                <span className="ml-2 text-primary">Show Code</span>
                              </span>
                            }
                            key="2"
                            showArrow={false}
                          >
                            <SyntaxHighlighter
                              language="jsx"
                              style={base16AteliersulphurpoolLight}
                              useInlineStyles={true}
                            >
                              {`import \{ InputNumber, Button \} from 'antd';

class App extends React.Component \{
  state = \{
    disabled\: true,
  \};
  toggle = () => \{
    this.setState(\{
      disabled\: !this.state.disabled,
    \});
  \}
  render() \{
    return (
      <div>
        <InputNumber min=\{1\} max=\{10\} disabled=\{this.state.disabled\} defaultValue=\{3\} />
        <div style=\{\{ marginTop\: 20 \}\}>
          <Button onClick=\{this.toggle\} type="primary">Toggle disabled</Button>
        </div>
      </div>
    );
  \}
\}

ReactDOM.render(<App />, mountNode);
`}
                            </SyntaxHighlighter>
                          </Panel>
                        </Collapse>
                      </div>
                      <div className="card-body">
                        <div id="InputnumberDisabled" />
                      </div>
                    </div>
                    <div className="card" id="components-input-number-demo-size">
                      <div className="card-header">
                        <h5 className="mb-0 mr-3 d-inline-block text-black">
                          <strong className="text-capitalize">Sizes</strong>
                        </h5>
                      </div>
                      <div className="cat__ant-component-collapse-descr">
                        <Collapse bordered={false} defaultActiveKey={['1']}>
                          <Panel
                            header={
                              <span>
                                <Icon
                                  style={{ fontSize: 16, color: '#9f9f9f' }}
                                  type="info-circle-o"
                                />
                                <span className="ml-2 text-primary">Description</span>
                              </span>
                            }
                            key="1"
                            showArrow={false}
                          >
                            <div>
                              There are three sizes available to a numeric input box. By default,
                              the size is <code>{'32px'}</code>. The two additional sizes are{' '}
                              <code>{'large'}</code> and <code>{'small'}</code> which means{' '}
                              <code>{'40px'}</code> and <code>{'24px'}</code>, respectively.
                            </div>
                          </Panel>
                          <Panel
                            header={
                              <span>
                                <i
                                  className="fa fa-code"
                                  style={{ fontSize: 16, color: '#9f9f9f' }}
                                />
                                <span className="ml-2 text-primary">Show Code</span>
                              </span>
                            }
                            key="2"
                            showArrow={false}
                          >
                            <SyntaxHighlighter
                              language="jsx"
                              style={base16AteliersulphurpoolLight}
                              useInlineStyles={true}
                            >
                              {`import \{ InputNumber \} from 'antd';

function onChange(value) \{
  console.log('changed', value);
\}

ReactDOM.render(
  <div>
    <InputNumber size="large" min=\{1\} max=\{100000\} defaultValue=\{3\} onChange=\{onChange\} />
    <InputNumber min=\{1\} max=\{100000\} defaultValue=\{3\} onChange=\{onChange\} />
    <InputNumber size="small" min=\{1\} max=\{100000\} defaultValue=\{3\} onChange=\{onChange\} />
  </div>
, mountNode);
`}
                            </SyntaxHighlighter>
                          </Panel>
                        </Collapse>
                      </div>
                      <div className="card-body">
                        <div id="InputnumberSize" />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="card" id="components-input-number-demo-digit">
                      <div className="card-header">
                        <h5 className="mb-0 mr-3 d-inline-block text-black">
                          <strong className="text-capitalize">Decimals</strong>
                        </h5>
                      </div>
                      <div className="cat__ant-component-collapse-descr">
                        <Collapse bordered={false} defaultActiveKey={['1']}>
                          <Panel
                            header={
                              <span>
                                <Icon
                                  style={{ fontSize: 16, color: '#9f9f9f' }}
                                  type="info-circle-o"
                                />
                                <span className="ml-2 text-primary">Description</span>
                              </span>
                            }
                            key="1"
                            showArrow={false}
                          >
                            <div>
                              A numeric-only input box whose values can be increased or decreased
                              using a decimal step. The number of decimals (also known as precision)
                              is determined by the step prop.
                            </div>
                          </Panel>
                          <Panel
                            header={
                              <span>
                                <i
                                  className="fa fa-code"
                                  style={{ fontSize: 16, color: '#9f9f9f' }}
                                />
                                <span className="ml-2 text-primary">Show Code</span>
                              </span>
                            }
                            key="2"
                            showArrow={false}
                          >
                            <SyntaxHighlighter
                              language="jsx"
                              style={base16AteliersulphurpoolLight}
                              useInlineStyles={true}
                            >
                              {`import \{ InputNumber \} from 'antd';

function onChange(value) \{
  console.log('changed', value);
\}

ReactDOM.render(
  <InputNumber min=\{0\} max=\{10\} step=\{0.1\} onChange=\{onChange\} />
, mountNode);
`}
                            </SyntaxHighlighter>
                          </Panel>
                        </Collapse>
                      </div>
                      <div className="card-body">
                        <div id="InputnumberDigit" />
                      </div>
                    </div>
                    <div className="card" id="components-input-number-demo-formatter">
                      <div className="card-header">
                        <h5 className="mb-0 mr-3 d-inline-block text-black">
                          <strong className="text-capitalize">Formatter</strong>
                        </h5>
                      </div>
                      <div className="cat__ant-component-collapse-descr">
                        <Collapse bordered={false} defaultActiveKey={['1']}>
                          <Panel
                            header={
                              <span>
                                <Icon
                                  style={{ fontSize: 16, color: '#9f9f9f' }}
                                  type="info-circle-o"
                                />
                                <span className="ml-2 text-primary">Description</span>
                              </span>
                            }
                            key="1"
                            showArrow={false}
                          >
                            <div>
                              Display value within it's situation with <code>{'formatter'}</code>,
                              and we usually use <code>{'parser'}</code> at the same time.
                            </div>
                          </Panel>
                          <Panel
                            header={
                              <span>
                                <i
                                  className="fa fa-code"
                                  style={{ fontSize: 16, color: '#9f9f9f' }}
                                />
                                <span className="ml-2 text-primary">Show Code</span>
                              </span>
                            }
                            key="2"
                            showArrow={false}
                          >
                            <SyntaxHighlighter
                              language="jsx"
                              style={base16AteliersulphurpoolLight}
                              useInlineStyles={true}
                            >
                              {`import \{ InputNumber \} from 'antd';

function onChange(value) \{
  console.log('changed', value);
\}

ReactDOM.render(
  <div>
    <InputNumber
      defaultValue=\{1000\}
      formatter=\{value => \`\$ \$\{value\}\`.replace(/\B(?=(\d\{3\})+(?!\d))/g, ',')\}
      parser=\{value => value.replace(/\\$\s?|(,*)/g, '')\}
      onChange=\{onChange\}
    />
    <InputNumber
      defaultValue=\{100\}
      min=\{0\}
      max=\{100\}
      formatter=\{value => \`\$\{value\}%\`\}
      parser=\{value => value.replace('%', '')\}
      onChange=\{onChange\}
    />
  </div>
, mountNode);
`}
                            </SyntaxHighlighter>
                          </Panel>
                        </Collapse>
                      </div>
                      <div className="card-body">
                        <div id="InputnumberFormatter" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default InputnumberItems

import React, { Component } from 'react';
const { clipboard } = require('electron')
import is from 'electron-is';
import './index.css';
import constants from '../../../constants';
import { displayStyle } from '../../../utils';
import PopOver from '../PopOver';
import TopBar from '../TopBar';
import Footer from '../Footer';
import ReactJson from 'react-json-view';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'tab1',
      myJson: {},
      clipboardText: ''
    };

    this.onChangeTab = this.onChangeTab.bind(this);
  }

  tick() {
    const text = clipboard.readText();
    if (text == this.state.clipboardText) {
      return;
    }

    console.log('clipboard:', text);

    try {
      this.setState({
        clipboardText: text,
        myJson: JSON.parse(text)
      })
    } catch(error) {
        // throw error;
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onChangeTab(tabName) {
    this.setState({
      selectedTab: tabName.toLowerCase(),
    });
  }

  render() {
    const contentStyle = {
      borderTopLeftRadius: is.macOS() ? constants.macWinBorderRadius : 0,
      borderTopRightRadius: is.macOS() ? constants.macWinBorderRadius : 0,
      borderBottomLeftRadius: is.macOS() ? 0 : constants.nonMacWinBorderRadius,
      borderBottomRightRadius: is.macOS() ? 0 : constants.nonMacWinBorderRadius,
    };

    return (
      <div className="app">
        <div className="top-popover" style={displayStyle(is.macOS())}>
          {/* <PopOver position="top" height={12} /> */}
        </div>
        <div className="content" style={contentStyle}>
          {/* <div className="top-bar-container">
            <TopBar onChangeTab={this.onChangeTab} />
          </div> */}
          <div className="tab-pages">
            <div className="tab1-panel-container" style={displayStyle(this.state.selectedTab === 'tab1')}>
            <ReactJson src={this.state.myJson} indentWidth={2} enableClipboard={false} />
            </div>
            <div className="tab2-panel-container" style={displayStyle(this.state.selectedTab === 'tab2')}>
              tab2
            </div>
          </div>
        </div>
        <div className="bottom-popover" style={displayStyle(!is.macOS())}>
          <PopOver position="bottom" height={12} />
        </div>
      </div>
    );
  }
}

export default App;

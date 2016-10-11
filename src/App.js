import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const OverlySimplifiedRouter = InnerComp => class extends Component {
    constructor() {
        super()

        window.onpopstate = (evt) => {
            this.setState({
              filterFlag: this.getFlagFromPath(document.location.pathname)
            })
        }

        this.gotoRoute = this.gotoRoute.bind(this)
        this.getFlagFromPath = this.getFlagFromPath.bind(this)
    }
    componentWillMount() {
        const filterFlag = this.getFlagFromPath(document.location.pathname)
        this.setState({filterFlag})
    }

    getFlagFromPath (path) {
        return path.substring(path.lastIndexOf('/')+1) || 'all'
    }

    gotoRoute (evt, route) {
        evt.preventDefault()
        history.pushState(null, null, route)
        this.setState({filterFlag: this.getFlagFromPath(route)})
    }

    render() {
        return (
            <div>
                <h1>Sample Router</h1>
                <InnerComp go={this.gotoRoute} {...this.state} {...this.props} />
            </div>
        )
    }
}

const DumbComponent = (props) => {
    return (
        <div>
            <h2>Dumb Component...{props.filterFlag}</h2>
            <a href="#" onClick={evt => props.go(evt, '/')}>all</a> |
            <a href="#" onClick={evt => props.go(evt, '/complete')}>complete</a> |
            <a href="#" onClick={evt => props.go(evt, '/active')}>active</a>
        </div>
    )
}

const RoutedComp = OverlySimplifiedRouter(DumbComponent)

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <RoutedComp test="Whatever"/>
      </div>
    );
  }
}

export default App;

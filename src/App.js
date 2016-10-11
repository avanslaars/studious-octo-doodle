import React, { Component  } from 'react';
import logo from './logo.svg';
import './App.css';

const getPath = () => document.location.pathname.substring(document.location.pathname.lastIndexOf('/'))

class Router extends Component {
    constructor() {
        super()
        window.onpopstate = (evt) => {
            this.setState({
              route: getPath()
            })
        }
        this.state = {
            route: getPath()
        }

        this.handleClick = this.handleClick.bind(this)
    }

    static childContextTypes = {
        clickHandler: React.PropTypes.func
    }

    handleClick(route) {
        this.setState({route})
        history.pushState(null, null, route)
    }

    getChildContext() {
        return {
            clickHandler: this.handleClick
        }
    }

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}

class Match extends Component {
    render() {
        return this.props.pattern === getPath() ? <this.props.component /> : null
    }
}

class Link extends Component {
    static contextTypes = {
        clickHandler: React.PropTypes.func
    }

    constructor() {
        super()
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(evt) {
        evt.preventDefault()
        this.context.clickHandler(this.props.to)
    }

    render() {
        return <a href="#" onClick={this.handleClick}>{this.props.children}</a>
    }
}

const One = () => <h1>One</h1>
const Two = () => <h2>Two</h2>
const Three = () => <h3>Three</h3>


class App extends Component {

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <Router>
            <Link to="/">One</Link>
            <Link to="/two">Two</Link>
            <Link to="/three">Three</Link>

            <Match pattern="/" component={One}/>
            <Match pattern="/two" component={Two}/>
            <Match pattern="/three" component={Three}/>
        </Router>
      </div>
    );
  }
}

export default App;

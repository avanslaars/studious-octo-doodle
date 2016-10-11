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
        route: React.PropTypes.string,
        clickHandler: React.PropTypes.func
    }

    handleClick(route) {
        this.setState({route})
        history.pushState(null, null, route)
    }

    getChildContext() {
        return {
            route: this.state.route,
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
    static contextTypes = {
        route: React.PropTypes.string
    }
    render() {
        return this.props.pattern === this.context.route ? <this.props.component route={this.context.route} /> : null
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

const One = (props) => <h1>One {props.route}</h1>
const Two = (props) => <h2>Two {props.route}</h2>
const Three = (props) => <h3>Three {props.route}</h3>


class App extends Component {

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <Router>
            <Link to="/">One</Link> |
            <Link to="/two">Two</Link> |
            <Link to="/three">Three</Link> |
            <Link to="/four">Three again with a different value</Link> |
            <Link to="/five">Three again with yet another value</Link>

            <Match pattern="/" component={One}/>
            <Match pattern="/two" component={Two}/>
            <Match pattern="/three" component={Three}/>
            <Match pattern="/four" component={Three}/>
            <Match pattern="/five" component={Three}/>
        </Router>
      </div>
    );
  }
}

export default App;

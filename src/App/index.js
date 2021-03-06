import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
} from 'react-router-dom';
import '../spectre.min.css';

import Nav from '../components/Nav';
import CreatePage from '../pages/CreatePage';
import ProjectPage from '../pages/ProjectPage';
import HomePage from '../pages/HomePage';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      auth: null,
    };
  }

  componentDidMount() {
    fetch('/api/users/me', { credentials: 'include' })
      .then(res => res.json())
      .then(result => this.setState({ auth: result }));
  }

  render() {
    const auth = this.state.auth;
    return (
      <Router>
        <div>
          <Nav auth={this.state.auth} />
          <div className="container grid-md">
            <Route exact path="/" component={HomePage} />
            <Route path="/create" render={() =>
              auth
              ? <CreatePage />
              : <Redirect to="/" />
            } />
            <Route path="/projects/:id" render={({ match }) =>
                <ProjectPage id={match.params.id} auth={auth} />
            } />
          </div>
        </div>
      </Router>
    );
  }

}

export default App

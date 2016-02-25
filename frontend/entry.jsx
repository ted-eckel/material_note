var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var History = ReactRouter.History;

var App = require('./components/app');
var NewUserForm = require('./components/user/newUserForm');
var NewSessionForm = require('./components/session/newSessionForm');
var NotesIndex = require('./components/notes/notesIndex');
var NoteDetail = require('./components/notes/noteDetail');
var Header = require('./components/header');

var CurrentUserStore = require('./stores/currentUserStore');
var SessionsApiUtil = require('./util/session_api_util');

var MaterialNote = React.createClass({

  mixins: [History],

  goToSignUp: function() {
    this.props.history.pushState(null, 'users/new', {});
  },

  goToSignIn: function() {
    this.props.history.pushState(null, 'session/new', {});
  },

  signInAsGuest: function() {
    SessionsApiUtil.loginAsGuest(function() {
      this.history.pushState(null, "/notes");
    }.bind(this));
  },

  render: function() {
    return(
      <div className="welcome-landing">
        <div className="mdl-layout mdl-js-layout">
          <header className="mdl-layout__header mdl-layout__header--scroll">
            <div className="mdl-layout__header-row">
                  //  Title
              <span className="mdl-layout-title">Title</span>
                  //  Add spacer, to align navigation to the right
              <div className="mdl-layout-spacer"></div>
                  //  Navigation
              <nav className="mdl-navigation">
                <a className="mdl-navigation__link" href="">Link</a>
                <a className="mdl-navigation__link" href="">Link</a>
                <a className="mdl-navigation__link" href="">Link</a>
                <a className="mdl-navigation__link" href="">Link</a>
              </nav>
            </div>
          </header>
          <div className="mdl-layout__drawer">
            <span className="mdl-layout-title">Title</span>
            <nav className="mdl-navigation">
              <a className="mdl-navigation__link" href="">Link</a>
              <a className="mdl-navigation__link" href="">Link</a>
              <a className="mdl-navigation__link" href="">Link</a>
              <a className="mdl-navigation__link" href="">Link</a>
            </nav>
          </div>
          <main className="mdl-layout__content">
            <div className="page-content">
              <h1 className="welcome-header">Welcome to MaterialNote</h1>
            </div>
          </main>
        </div>
      </div>
    );
  }
});

var router = (
  <Router>
    <Route path="/" component={MaterialNote} />
    <Route path="notes" component={App} onEnter={_ensureLoggedIn}>
      <Route path=":id" component={NoteDetail} />
    </Route>
    <Route path="users/new" component={NewUserForm} />
    <Route path="session/new" component={NewSessionForm} />
  </Router>
);

function _ensureLoggedIn(nextState, replace, callback) {

  if (CurrentUserStore.currentUserFetched()) {
    __redirectIfNotLoggedIn();
  }
  else {
    SessionsApiUtil.fetchCurrentUser(__redirectIfNotLoggedIn);
  }

  function __redirectIfNotLoggedIn () {
    if (!CurrentUserStore.isLoggedIn()) {
      replace({}, "/session/new");
    }
    callback();
  }
}


document.addEventListener("DOMContentLoaded", function(e) {
  var root = document.getElementById("root-content");
  ReactDOM.render(router, root);
});

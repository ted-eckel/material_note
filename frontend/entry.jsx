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
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
    			<div className="mdl-layout__header">
    				<div className="mdl-layout__header-row">
    					<span className="mdl-layout-title">MaterialNote</span>
    					<div className="mdl-layout-spacer"></div>
    					<button id="bars" className= "mdl-color-text--white mdl-button" onClick={this.goToSignIn}>
    						SIGN IN
    					</button>
    					<ul className="mdl-menu mdl-menu--bottom-left mdl-js-menu" htmlFor="bars">
    						<li className="mdl-menu__item">A</li>
    						<li className="mdl-menu__item">B</li>
    						<li disabled className="mdl-menu__item">C</li>
    						<li className="mdl-menu__item">D</li>
    					</ul>
    					<nav className="mdl-navigation">
    						<a className="mdl-navigation__link" href="#">BAR</a>
    						<a className="mdl-navigation__link" href="#">BAR</a>
    						<a className="mdl-navigation__link" href="#">BAR</a>
    						<div className="material-icons mdl-badge" data-badge="5">account_box</div>
    					 </nav>
    					<div className="mdl-textfield mdl-js-textfield mdl-textfield--expandable mdl-textfield--floating-label mdl-textfield--align-right">
              				<label className="mdl-button mdl-js-button mdl-button--icon" htmlFor="search"><i className="material-icons">search</i></label>
              				<div className="mdl-textfield__expandable-holder">
                				<input className="mdl-textfield__input" type="text" id="search" />
    				   		</div>
    					</div>
    				</div>
    			</div>
    			<div className="mdl-layout__drawer">
    				<span className="mdl-layout-title">
    				</span>
    				<nav className="mdl-navigation">
    				  <a className="mdl-navigation__link" href="">BAR</a>
    				  <a className="mdl-navigation__link" href="">BAR</a>
    				  <a className="mdl-navigation__link" href="">BAR</a>
    				  <a className="mdl-navigation__link" href="">BAR</a>
    				</nav>
    			  </div>
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

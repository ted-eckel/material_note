var React = require('react');
var ErrorMessages = require('./../errorMessages');
var ErrorStore = require('./../../stores/errors');
var UserApiAUtil = require('./../../util/user_api_util');
var NotebookApiUtils = require('./../../util/notebooks_api_util');
var SessionsApiUtil = require('./../../util/session_api_util');
var NoteApiUtils = require('./../../util/notes_api_util');
var NoteConstants = require('./../../constants/note_constants');
var History = require('react-router').History;

var NewUserForm = React.createClass({

  mixins: [History],

  addUser: function(e) {
    e.preventDefault();
    var fields = $(e.currentTarget).serializeArray();
    var credentials = {};
    fields.forEach(function(field){
      credentials[field.name] = field.value;
    });

    UserApiAUtil.createUser(credentials, function(user) {
      this.history.pushState(null, "/notes");
    }.bind(this));

  },

  signInAsGuest: function() {
    SessionsApiUtil.loginAsGuest(function(user) {
      this.history.pushState(null, "/notes");
    }.bind(this));
  },

  //Clear errors when this thing unmounts
  componentWillUnmount: function() {
    ErrorStore.clearMessages();
  },

  render: function() {
    return(
      <div className="wrapper">
        <div className="bar-header">
          <div className="logo-bar"></div>
        </div>
        <div id="container-boundingbox" className="wrapper">
          <div id="container" className="wrapper">
            <div className="main">
              <div className="MinimalFormFrame">
                <div className="heading">
                  <div className="branding"></div>
                    <h2>Create Account</h2>
                </div>
                <div className="minimal-wrapper">
                  <div className="minimal-body">
                    <div className="MinimalLoginForm">
                      <div className="signin">
                        <form name="login_form" className="minimal-form" onSubmit={this.submit}>
                          <div className="success-notification-light"></div>
                          <ol>
                            <li className="Row">
                              <div className="mdl-textfield mdl-js-textfield" id="row-form">
                                <input className="mdl-textfield__input" type="text" name="user[username]" value="" />
                                <label className="mdl-textfield__label" for="username">Username</label>
                              </div>
                            </li>
                            <li className="Row">
                              <div className="mdl-textfield mdl-js-textfield" id="row-form">
                                <input className="mdl-textfield__input" type="password" name="user[password]" value="" />
                                <label className="mdl-textfield__label" for="password">Password</label>
                              </div>
                            </li>
                            <li>
                              <button value="Create Account"
                                className="mdl-button mdl-js-button mdl-button--raised
                                  mdl-js-ripple-effect mdl-button--primary mdl-color-text--white
                                  Btn Btn_emph Btn_super">
                                  Create Account
                              </button>
                            </li>
                          </ol>
                        </form>
                        <ErrorMessages />
                      </div>
                    </div>
                  </div>
                </div>
                <div id="context-switch">
                  <div className="t-pico">Already have an account?</div>
                  <div className="switch">
                    <a href="#/session/new" id="switch-form switch-link">Sign In</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer-wrapper">
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = NewUserForm;

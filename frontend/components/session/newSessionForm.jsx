var React = require('react');
var SessionsApiUtil = require('./../../util/session_api_util');
var History = require('react-router').History;
var ErrorMessages = require('./../errorMessages');
var ErrorStore = require('./../../stores/errors');

var NewSessionForm = React.createClass({

  mixins: [History],

  redirectToNotes: function() {
    this.history.pushState(null, "/notes");
  },

  componentWillUnmount: function() {
    ErrorStore.clearMessages();
  },

  signInAsGuest: function() {
    SessionsApiUtil.loginAsGuest(this.redirectToNotes);
  },

  submit: function(e) {
    e.preventDefault();
    var fields = $(e.currentTarget).serializeArray();
    var credentials = {};
    fields.forEach(function(field){
      credentials[field.name] = field.value;
    });

    SessionsApiUtil.login(credentials, this.redirectToNotes);

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
                    <h2>Sign In</h2>
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
                                <input className="mdl-textfield__input" type="text" name="username" />
                                <label className="mdl-textfield__label" htmlFor="username">Username</label>
                              </div>
                            </li>
                            <li className="Row">
                              <div className="mdl-textfield mdl-js-textfield" id="row-form">
                                <input className="mdl-textfield__input" type="password" name="password" />
                                <label className="mdl-textfield__label" htmlFor="password">Password</label>
                              </div>
                            </li>
                            <li>
                              <button type="submit" value="Sign In"
                                className="mdl-button mdl-js-button mdl-button--raised
                                  mdl-js-ripple-effect mdl-button--primary mdl-color-text--white
                                  Btn Btn_emph Btn_super">
                                  Sign In
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
                  <div className="t-pico">Don't have an account?</div>
                  <div className="switch">
                    <a href="#/users/new" id="switch-form switch-link">Create account</a>
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

module.exports = NewSessionForm;

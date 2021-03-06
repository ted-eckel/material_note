var ReactDOM = require('react-dom'),
    React = require('react'),
    ReactRouter = require('react-router'),
    Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    hashHistory = ReactRouter.hashHistory,
    NotebookIndex = require('./components/notebooks/notebook_index'),
    NoteShowPage = require('./components/notes/note_show_page'),
    NoteFormModal = require('./components/notes/form_modal'),
    NotebookFormModal = require('./components/notebooks/notebook_form_modal'),
    NotebookStore = require('./stores/notebook_store'),
    NotebookActions = require('./actions/notebook_actions');

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

var App = React.createClass({
  getInitialState: function () {
    return ({
      value: "",
    });
  },

  render: function(){
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <div>
              <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
                <header className="mdl-layout__header">
                  <div className="mdl-layout__header-row">
                    <span className="mdl-layout-title mdl-color-text--white">MaterialNote</span>
                    <div className="mdl-layout-spacer"></div>
                  </div>
                </header>
                <div className="mdl-layout__drawer">
                  <NotebookIndex/>
                </div>
              </div>
              <div id="floating-action-menu-thing" className="fixed-action-btn">
                <NoteFormModal/>
                <ul>
                  <li><NotebookFormModal/></li>
                </ul>
              </div>
              <div className='container group'>
                {this.props.children}
              </div>
            </div>
            <div className="background-text-letterpress">
              Welcome to MaterialNote!
              <br/>
              <br/>
              In order to create a notebook, hover over the floating action button (
                <i className="material-icons">add</i>
              )
              on the bottom-right, and click the notebook icon (
                <i className="material-icons">book</i>
              ). Then give your notebook a title!
              <br/>
              <br/>
              To create a note, click the floating action button,
              select a notebook, and give your note a title and a body. Notes
              can be edited by selecting them from the sidebar menu (
                <i className="material-icons">menu</i>
              ) within their respective notebook.
            </div>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
});

var routes = (
  <Route path="/" component={App}>
    <Route path='notes/:id' component={NoteShowPage}></Route>
  </Route>
);




document.addEventListener("DOMContentLoaded", function () {
  var root = document.getElementById('root');
  if (root) {
    ReactDOM.render(<Router history={hashHistory}>{routes}</Router>, root);
  }
});

var ReactDOM = require('react-dom'),
    React = require('react'),
    ReactRouter = require('react-router'),
    Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    hashHistory = ReactRouter.hashHistory,
    NotebookIndex = require('./components/notebooks/notebook_index'),
    Sidebar = require('./components/sidebar'),
    AllNotes = require('./components/notes/all_notes'),
    NoteIndex = require('./components/notes/note_index'),
    ReactQuill = require("../node_modules/react-quill"),
    NoteShowPage = require('./components/notes/note_show_page'),
    Slideout = require('./components/slideout'),
    NoteFormModal = require('./components/notes/form_modal'),
    NotebookFormModal = require('./components/notebooks/notebook_form_modal');

var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

var App = React.createClass({
  getInitialState: function () {
    return {value: ""};
  },

  render: function(){
    return (
      <div>
        <div className="sidebar-parent">
          <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
            <header className="mdl-layout__header">
              <div className="mdl-layout__header-row">
                <span className="mdl-layout-title mdl-color-text--white">MaterialNote</span>
                <div className="mdl-layout-spacer"></div>
              </div>
            </header>
            <div className="mdl-layout__drawer">
              <Slideout/>
            </div>
          </div>
          <Sidebar/>
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
          To create a note, click the floating action button on the bottom-right,
          select a notebook, and give your note a title and a body. Notes
          can be edited by clicking them in the sidebar menu, within their respective notebook.
          <br/>
          <br/>
          In order to create a notebook, hover over the floating action button
          on the bottom-right, and click the notebook icon. Then give your notebook a title!
        </div>
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

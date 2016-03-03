var ReactDOM = require('react-dom'),
    React = require('react'),
    ReactRouter = require('react-router'),
    Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    NotebookIndex = require('./components/notebooks/notebook_index'),
    Sidebar = require('./components/sidebar'),
    AllNotes = require('./components/notes/all_notes'),
    NoteIndex = require('./components/notes/note_index'),
    ReactQuill = require("../node_modules/react-quill"),
    NoteShowPage = require('./components/notes/note_show_page'),
    Slideout = require('./components/slideout'),
    NoteFormModal = require('./components/notes/form_modal');

var App = React.createClass({
  getInitialState: function () {
    return {value: ""};
  },

  render: function(){
    return (
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
          {/*<Slideout/>*/}
          <Sidebar/>
          <NoteFormModal/>
          <div className='container group'>
            {this.props.children}
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
  ReactDOM.render(<Router>{routes}</Router>, document.getElementById('root'));
});

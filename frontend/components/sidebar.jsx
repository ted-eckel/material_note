
var React = require('react');
var ApiUtil = require('../util/api_util');
var ShowActions = require('../actions/show_actions');
var ShowStore = require('../stores/show_store');
var NoteFormModal = require('./notes/form_modal');
var SearchModal = require('./notes/search_modal');
var TagModal = require('./notes/tag_modal');
var Sidebar = React.createClass({

  activateNotebooks: function () {
    ShowActions.ShowNotebookIndex();
  },

  showNotes: function () {
    ApiUtil.fetchNotes();
    ShowActions.ShowAllNotes();
  },

  componentDidMount: function () {
    this.lowerButtonsNotebooks.click();
  },

  render: function() {
    return (
      <div className="sidebar">
        <div>
          {/*
          <img className="logo" src="/assets/materialnotelogo" />
          */}
          <div className='sidebar-buttons'>
            <ul className="lower-ul">
              <li onClick={this.showNotes}
                  className="lower-buttons notes mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-color-text--white mdl-color--primary mdl-button--colored mdl-shadow--4dp"
                  data-content="Notes">
                  <i className="material-icons">note</i>
              </li>
              <li onClick={this.activateNotebooks}
                  ref={function(ref){this.lowerButtonsNotebooks = ref;}.bind(this)}
                  className="lower-buttons notebooks mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-color-text--white mdl-color--primary mdl-button--colored mdl-shadow--4dp"
                  data-content="Notebooks">
                  <i className="material-icons">book</i>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Sidebar;
            // <SearchModal/>
              // <li className="lower-buttons tags"
              //     data-content="Tags">
              //     <i className="fa fa-tags fa-2x"></i>
              // </li>

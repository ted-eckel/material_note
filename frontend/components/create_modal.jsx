var React = require('react');
var Modal = require('boron/OutlineModal');
var NoteForm = require('./notes/noteform');
var NotebookForm = require('./notebooks/notebookform');
var NoteBookStore = require('../stores/notebook_store');

var CreateModal = React.createClass({
  showModal: function () {
    this.refs.modal.show();
  },

  hideModal: function () {
    this.refs.modal.hide();
  },

  render: function () {
    return (
      <div className="fixed-action-btn">
        <button
          data-content="Add Note"
          id="animated-fab-button--create"
          onClick={this.showModal}
          className="btn-floating mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-color-text--white mdl-color--primary mdl-button--colored mdl-shadow--4dp">
          <Modal ref="modal">
            <NoteForm hideModal={this.hideModal}/>
          </Modal>
          <span className="hover">
            <i className="material-icons">create</i>
          </span>
          <span className="normal">
            <i className="material-icons">add</i>
          </span>
        </button>
        <div className="mdl-tooltip" htmlFor="animated-fab-button--create">Create Note</div>
        <ul>
          <li>
            <button id="animated-fab-button--create-notebook" className="btn-floating mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored mdl-color--primary mdl-color-text--white mdl-js-ripple-effect" onClick={this.showModal}>
              <i className="material-icons">book</i>
              <Modal ref="modal">
                <NotebookForm hideModal={this.hideModal}/>
              </Modal>
            </button>
            <div className="mdl-tooltip" htmlFor="animated-fab-button--create-notebook">Create Note</div>
          </li>
        </ul>
      </div>
    );
  }
});

module.exports = CreateModal;

var React = require('react');
var Modal = require('boron/OutlineModal');
var NoteForm = require('./noteform');
var NoteBookStore = require('../../stores/notebook_store');

var NoteFormModal = React.createClass({
  showModal: function () {
    this.refs.modal.show();
  },

  hideModal: function () {
    this.refs.modal.hide();
  },

  render: function () {
    return (
      <div onClick={this.showModal}
          data-content="Add Note">
          <Modal ref="modal">
            <NoteForm hideModal={this.hideModal}/>
          </Modal>
          <button
            id="animated-fab-button--create"
            className="btn-floating mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-color-text--white mdl-color--primary mdl-button--colored mdl-shadow--4dp">
            <span className="hover">
              <i className="material-icons">create</i>
            </span>
            <span className="normal">
              <i className="material-icons">add</i>
            </span>
          </button>
      </div>
    );
  }
});

module.exports = NoteFormModal;

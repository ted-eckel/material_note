var React = require('react');
var Modal = require('boron/OutlineModal');
var NotebookForm = require('./notebookform');

var NotebookFormModal = React.createClass({
  showModal: function () {
    this.refs.modal.show();
  },

  hideModal: function () {
    this.refs.modal.hide();
  },

  render: function () {
    return (
      <button className="newnotebook-button mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-color-text--white mdl-js-ripple-effect" onClick={this.showModal}>
        <span>
          Create Notebook
        </span>
          <Modal ref="modal">
            <NotebookForm hideModal={this.hideModal}/>
          </Modal>
      </button>
    );
  }
});

module.exports = NotebookFormModal;

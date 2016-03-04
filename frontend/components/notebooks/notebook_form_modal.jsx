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
      <button className="btn-floating mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored mdl-color--primary mdl-color-text--white mdl-js-ripple-effect" onClick={this.showModal}>
        <i className="material-icons">book</i>
        <Modal ref="modal">
          <NotebookForm hideModal={this.hideModal}/>
        </Modal>
      </button>
    );
  }
});

module.exports = NotebookFormModal;

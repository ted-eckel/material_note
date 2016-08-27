var React = require('react');
var NotebookForm = require('./notebookform');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var ApiUtil = require('../../util/api_util');

import Dialog from 'material-ui/Dialog';

var NotebookFormModal = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function () {
    return ({open: false,
            title: "",
            description: ""});
  },

  handleOpen: function() {
    this.setState({open: true});
  },

  handleClose: function() {
    this.setState({open: false});
  },

  createNotebook: function(e){
    e.preventDefault();
    ApiUtil.createNotebook({title: this.state.title});
    this.setState({title: ''});
    this.handleClose();
  },

  render: function () {
    return (
      <div>
        <button className="btn-floating mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored mdl-color--primary mdl-color-text--white mdl-js-ripple-effect" onClick={this.handleOpen}>
          <i className="material-icons">book</i>
        </button>
        <Dialog
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          style={{
            textalign: 'center'
          }}
          contentStyle={{width: '355px'}}>
          <form role='form' onSubmit={this.createNotebook}>
            <div className="notebook-form form-group">
                  Notebook Title:
                  <br/>
                <div className="mdl-textfield mdl-js-textfield">
                  <input className='mdl-textfield__input' type='text' valueLink={this.linkState('title')} id="notebook-title"/>
                  {/*<label className="mdl-textfield__label" htmlFor="notebook-title">Notebook Title</label>*/}
                </div>
            </div>
            <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-color-text--white mdl-js-ripple-effect">Create Notebook</button>
          </form>
        </Dialog>
      </div>
    );
  }
});

module.exports = NotebookFormModal;

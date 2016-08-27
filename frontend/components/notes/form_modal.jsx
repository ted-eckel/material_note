var React = require('react');
var NoteForm = require('./noteform');
var NotebookStore = require('../../stores/notebook_store');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var ApiUtil = require('../../util/api_util');

import Dialog from 'material-ui/Dialog';

var NoteFormModal = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function () {
    return ({
      open: false,
      title: "",
      body: ""
    });
  },

  handleOpen: function() {
    this.setState({open: true});
  },

  handleClose: function() {
    this.setState({open: false});
  },

  createNote: function(e){
    e.preventDefault();
    ApiUtil.createNote({
      title: this.state.title,
      notebook_id: document.getElementById("selectList").value,
      body: this.state.body
    });
    this.setState({title: '', body: ''});
    this.handleClose();
  },

  render: function () {
    var NotebookDropDownOptions = NotebookStore.all().map(function (notebook, idx) {
      return (<option value={notebook.id}
                      key={idx}>{notebook.title}
              </option>);
    });

    var NotebookDefaultValue = NotebookStore.first().map(function (notebook) {
      return (notebook.id);
    });

    return (
      <div onClick={this.handleOpen}
          data-content="Add Note">
          <Dialog
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
            style={{
              textalign: 'center'
            }}>
            <form role='form' onSubmit={this.createNote}>

              <div className='form-group'>

                 Notebook:
                 <div className="centered-dropdown-options">
                   <select className='form-control' id="selectList" style={{width: '300px', margin: '0 auto'}}>
                     {NotebookDropDownOptions}
                   </select>
                 </div>
                 <br/>
                 <br/>
               {/*
                 <select className="mdl-menu mdl-menu--bottom-left mdl-js-menu mdl-js-ripple-effect form-control" id="selectList">
                 {NotebookDropDownOptions}
                 </select>
                 return (<option value={notebook.id} key={idx} className="mdl-menu__item">{notebook.title}</option>);
                 */}


                   Note Title:
                 <div className="mdl-textfield mdl-js-textfield" style={{left: '20%'}}>
                   <input className='form-control mdl-textfield__input' type='text' valueLink={this.linkState('title')}/>
                 </div>
                 <br/>
                 <br/>

                   Note Body:
                   <br/>
                 <div className="mdl-textfield mdl-js-textfield" style={{left: '20%'}}>
                   <textarea className='form-control mdl-textfield__input' type='text' valueLink={this.linkState('body')}/>
                 </div>
                </div>
                <br/>
              <button id="create-note-button" type="submit" className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-color-text--white mdl-js-ripple-effect">Create Note</button>
              <br/>
              <br/>
            </form>
          </Dialog>
          <button
            id="animated-fab-button--create"
            className="btn-floating mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-color-text--white mdl-color--primary mdl-button--colored mdl-shadow--4dp" onClick={this.handleOpen}>
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

var React = require('react');
var NotebookStore = require('../../stores/notebook_store');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var NoteActions = require('../../actions/note_actions');
var NotebookActions = require('../../actions/notebook_actions');

import Dialog from 'material-ui/Dialog';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

var NoteFormModal = React.createClass({

  getInitialState: function () {
    return ({
      notebooks: NotebookStore.all(),
      open: false,
      title: "",
      body: "",
      notebook_id: null
    });
  },

  _notebooksChanged: function () {
    this.setState({notebooks: NotebookStore.all()});
    if (this.state.notebooks.length > 0){
      this.setState({notebook_id: this.state.notebooks[0].id});
    }
  },

  componentWillMount: function(){
    NotebookStore.addListener(this._notebooksChanged);
    NotebookActions.fetchNotebooks();
  },

  inputNotebookChanged: function(e, idx,  value){
    this.setState({notebook_id: value});
  },

  inputTitleChanged: function(e){
    this.setState({title: e.target.value});
  },

  inputBodyChanged: function(e){
    this.setState({body: e.target.value});
  },

  handleOpen: function() {
    this.setState({open: true});
  },

  handleClose: function() {
    this.setState({open: false});
  },

  createNote: function(e){
    e.preventDefault();
    NoteActions.createNote({
      title: this.state.title,
      notebook_id: this.state.notebook_id,
      body: this.state.body
    });
    this.setState({title: '', body: ''});
    this.handleClose();
  },

  render: function () {
    {/*var NotebookDropDownOptions = this.state.notebooks.map(function (notebook, idx) {
      return (<option value={notebook.id}
                      key={idx}>{notebook.title}
              </option>);
    });*/}

    var NotebookDropDownOptions = this.state.notebooks.map(function (notebook, idx) {
      return (<MenuItem
                value={notebook.id}
                key={idx}
                primaryText={notebook.title} />
             );
    });

    var isNull = this.state.notebooks.length < 1;


    var createNoteButtonEnabled = (
      <FlatButton type="submit" label="Create Note"
        primary={true} id="create-note-button"
        style={{color: 'rgb(76, 175, 80)'}} />
    );
    var createNoteButtonDisabled = (
      <FlatButton label="Create Note" id="create-note-button"
        disabled={true} />
    );
    var createNoteButton = (isNull ? createNoteButtonDisabled : createNoteButtonEnabled);


    var noteTitleEnabled = (
      <TextField floatingLabelText="Title" className="form-control"
        underlineFocusStyle={{borderColor: 'rgb(76, 175, 80)'}}
        floatingLabelFocusStyle={{color: 'rgb(76, 175, 80)'}}
        value={this.state.title} onChange={this.inputTitleChanged}
        style={{width: '300px', margin: '0 auto'}} />
    );
    var noteTitleDisabled = (
      <TextField floatingLabelText="Title" disabled={true}
        className="form-control" style={{width: '300px', margin: '0 auto'}} />
    );
    var noteTitle = (isNull ? noteTitleDisabled : noteTitleEnabled);


    var noteBodyEnabled = (
      <TextField floatingLabelText="Body" multiLine={true} rows={2}
        rowsMax={4} underlineFocusStyle={{borderColor: 'rgb(76, 175, 80)'}}
        floatingLabelFocusStyle={{color: 'rgb(76, 175, 80)'}}
        value={this.state.body} onChange={this.inputBodyChanged}
        className="form-control" style={{width: '300px', margin: '0 auto'}} />
    );
    var noteBodyDisabled = (
      <TextField floatingLabelText="Body" multiLine={true} rows={2}
        className="form-control" rowsMax={4} disabled={true}
        style={{width: '300px', margin: '0 auto'}} />
    );
    var noteBody = (isNull ? noteBodyDisabled : noteBodyEnabled);

    return (
      <div onClick={this.handleOpen}
          data-content="Add Note">
          <Dialog
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
            style={{
              textalign: 'center'
            }}
            contentStyle={{width: '353px'}}>
            <form role='form' onSubmit={this.createNote}>

              <div className='form-group'>

                 {/*Notebook:
                 <br/>
                 <div className="mdl-selectfield">
                   <select onChange={this.inputNotebookChanged} className='form-control' id="selectList" style={{width: '300px', margin: '0 auto'}}>
                     {NotebookDropDownOptions}
                   </select>
                 </div>*/}
                 <SelectField
                   value={this.state.notebook_id}
                   onChange={this.inputNotebookChanged}
                   maxHeight={200}
                   className='form-control'
                   errorText={isNull && 'You need to create a notebook first'}
                   style={{width: '300px', margin: '0 auto'}}
                   floatingLabelText="Notebook"
                   floatingLabelFixed={true}>
                   {NotebookDropDownOptions}
                 </SelectField>
                 <br/>
                 <br/>

                   {/*Note Title:
                   <br/>
                 <div className="mdl-textfield mdl-js-textfield">
                   <input className='form-control mdl-textfield__input' type='text' value={this.state.title} onChange={this.inputTitleChanged}/>
                 </div>*/}
                 {noteTitle}
                 <br/>
                 <br/>

                   {/*Note Body:
                   <br/>
                 <div className="mdl-textfield mdl-js-textfield">
                   <textarea className='form-control mdl-textfield__input' type='text' value={this.state.body} onChange={this.inputBodyChanged}/>
                 </div>*/}
                 {noteBody}
                </div>
                <br/>
              {createNoteButton}
              {/*<button id="create-note-button" type="submit" className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-color-text--white mdl-js-ripple-effect">Create Note</button>*/}
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

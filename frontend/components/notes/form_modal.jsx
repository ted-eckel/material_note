import React, {Component} from 'react';
import NoteForm from './noteform';
import NotebookStore from '../../stores/notebook_store';
import Dialog from 'material-ui/Dialog';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import ApiUtil from '../../util/api_util';

export default class NoteFormModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {open: false,
                  notebook_id: null,
                  title: "",
                  body: "",
                  value: null};
  }

  handleChange = (event, index, value) => {
    this.setState({value, notebook_id: value});
  }

  handleTitle = (event) => {
    this.setState({title: event.target.value});
  }

  handleBody = (event) => {
    this.setState({body: event.target.value});
  }

  handleOpen = () => {
    this.setState({open: true});
  }

  handleClose = () => {
    this.setState({open: false});
  }

  createNote = (e) => {
    e.preventDefault();
    ApiUtil.createNote({
      title: this.state.title,
      notebook_id: this.state.notebook_id,
      body: this.state.body
    });
    this.setState({title: '', body: ''});
    this.handleClose();
  }

  render() {
    const styles = {
      underlineStyle: {
        borderColor: 'rgb(76, 175, 80)',
      },
      floatingLabelFocusStyle: {
        color: 'rgb(76, 175, 80)',
      },
    };

    const actions = [
      <FlatButton
        label="Create Note"
        style={{color: 'rgb(76, 175, 80)'}}
        onTouchTap={this.createNote}
      />,
    ];

    var NotebookDropDownOptions = NotebookStore.all().map(function(notebook, idx) {
      return (<MenuItem value={notebook.id}
        key={idx}
        primaryText={notebook.title} />);
      });

    return (
      <div onClick={this.handleOpen}
        data-content="Add Note">
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          contentStyle={{width: '305px', textAlign: 'center'}}
          actionsContainerStyle={{textAlign: 'center'}}
          >
          <SelectField value={this.state.value}
                       onChange={this.handleChange}
                       maxHeight={200}
                       id="selectList">
            {NotebookDropDownOptions}
          </SelectField>
          <br/>
          <TextField floatingLabelText="Note title"
                     value={this.state.title}
                     onChange={this.handleTitle}
                     underlineFocusStyle={styles.underlineStyle}
                     floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                     autoComplete="off"/>
          <br/>
          <TextField floatingLabelText="Note body"
                     value={this.state.body}
                     onChange={this.handleBody}
                     underlineFocusStyle={styles.underlineStyle}
                     floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                     autoComplete="off"/>
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
}

import React from 'react';
import ApiUtil from '../../util/api_util';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

export default class NotebookFormModal extends React.Component {
  constructor() {
    super();
    this.state = {open: false,
                  title: "",
                  description: ""};
  }

  handleChange = (event) => {
    this.setState({title: event.target.value});
  }

  handleOpen = () => {
    this.setState({open: true});
  }

  handleClose = () => {
    this.setState({open: false});
  }

  createNotebook = (e) => {
    e.preventDefault();
    ApiUtil.createNotebook({title: this.state.title});
    this.setState({title: ""});
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
    }

    const actions = [
      <FlatButton
        label="Create Notebook"
        style={{color: 'rgb(76, 175, 80)'}}
        onTouchTap={this.createNotebook}
      />,
    ];

    return (
      <div>
        <button className="btn-floating mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored mdl-color--primary mdl-color-text--white mdl-js-ripple-effect" onClick={this.handleOpen}>
          <i className="material-icons">book</i>
        </button>
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          contentStyle={{width: '305px', textAlign: 'center'}}
          actionsContainerStyle={{textAlign: 'center'}}
          >
          <TextField floatingLabelText="Notebook title"
                     id="notebook-title"
                     value={this.state.value}
                     onChange={this.handleChange}
                     underlineFocusStyle={styles.underlineStyle}
                     floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                     autoComplete="off"/>
        </Dialog>
      </div>
    );
  }
}

var React = require('react');
var NotebookActions = require('../../actions/notebook_actions');

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

var NotebookFormModal = React.createClass({

  getInitialState: function () {
    return ({open: false,
            title: ""});
  },

  inputTitleChanged: function(e){
    this.setState({title: e.target.value});
  },

  handleOpen: function() {
    this.setState({open: true});
  },

  handleClose: function() {
    this.setState({open: false});
  },

  createNotebook: function(e){
    e.preventDefault();
    NotebookActions.createNotebook({title: this.state.title});
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
            <TextField floatingLabelText="Notebook title"
              underlineFocusStyle={{borderColor: 'rgb(76, 175, 80)'}}
              floatingLabelFocusStyle={{color: 'rgb(76, 175, 80)'}}
              value={this.state.title} onChange={this.inputTitleChanged}
              style={{display: 'block', margin: '0 auto'}} />
            <FlatButton type="submit" label="Create Notebook"
              primary={true}
              style={{color: 'rgb(76, 175, 80)', display: 'block', margin: '0 auto'}} />
          </form>
        </Dialog>
      </div>
    );
  }
});

module.exports = NotebookFormModal;

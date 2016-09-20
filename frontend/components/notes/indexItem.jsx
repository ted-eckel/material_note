var React = require('react'),
    NoteActions = require('../../actions/note_actions');

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

var NoteIndexItem = React.createClass({

  getInitialState: function () {
    return ({open: false});
  },

  handleOpen: function() {
    this.setState({open: true});
  },

  handleClose: function() {
    this.setState({open: false});
  },

  deleteNote: function(e) {
    e.preventDefault();
    NoteActions.deleteNote(this.props.note);
  },

  render: function () {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
        style={{color: 'rgb(76, 175, 80)'}}
      />,
      <FlatButton
        label="Delete"
        primary={true}
        onTouchTap={
          this.handleClose}
        onClick={this.deleteNote}
        style={{color: 'rgb(76, 175, 80)'}}
      />,
    ];

    return (
      <div className="notes-index-item">
        <div className="enclose-text" onClick={this.props.handleClick.bind(null, this.props.note)}>
          <div className="notes-index-item-text">
            <div>
              <span>{this.props.note.title}</span>
            </div>
          </div>
        </div>
        <div onClick={this.handleOpen} className='trash'>
          <i className="material-icons">delete</i>
        </div>
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          Are you sure you want to delete this note?
        </Dialog>
      </div>
    );
  }
});

module.exports = NoteIndexItem;

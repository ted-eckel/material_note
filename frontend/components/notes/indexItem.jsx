var React = require('react');
    ApiUtil = require('../../util/api_util'),
    LinkedStateMixin = require('react-addons-linked-state-mixin'),
    Dialog = require('material-ui/lib/dialog'),
    FlatButton = require('material-ui/lib/flat-button');

var NoteIndexItem = React.createClass({
  mixins: [LinkedStateMixin],

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
    ApiUtil.deleteNote(this.props.note);
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

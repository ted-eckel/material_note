var React = require('react'),
    NotebookActions = require('../../actions/notebook_actions');

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

var NotebookIndexItem = React.createClass({

  getInitialState: function () {
    return ({open: false});
  },

  handleOpen: function() {
    this.setState({open: true});
  },

  handleClose: function() {
    this.setState({open: false});
  },

  deleteNotebook: function (e) {
    e.preventDefault();
    NotebookActions.deleteNotebook(this.props.notebook);
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
        onClick={this.deleteNotebook}
        style={{color: 'rgb(76, 175, 80)'}}
      />,
    ];

    if (!this.props.notebook) {
      return <div></div>;
    }
    return (
      <div className="notebook-index-item">
        <div className="enclose-text" onClick={this.props.handleClick.bind(null, this.props.notebook)}>
          <div className="notebook-index-item-text">
            <div>
              <span>
                {this.props.notebook.title}
              </span>
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
          Are you sure you want to delete this notebook?
        </Dialog>
      </div>
    );
  }
});

module.exports = NotebookIndexItem;

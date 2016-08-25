import React from 'react';
import ApiUtil from '../../util/api_util';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';


export default class NotebookIndexItem extends React.Component {

  constructor() {
    super();
    this.state = {open: false};
  }

  handleOpen = () => {
    this.setState({open: true});
  }

  handleClose = () => {
    this.setState({open: false});
  }

  deleteNotebook = (e) => {
    e.preventDefault();
    ApiUtil.deleteNotebook(this.props.notebook);
  }

  render() {
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
}

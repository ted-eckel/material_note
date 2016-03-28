var React = require('react');
var ApiUtil = require('../../util/api_util');

var NoteIndexItem = React.createClass({
  deleteNote: function (e) {
    e.preventDefault();
    var answer = confirm("Are you sure you want to delete this note?");
    if (answer) {
      ApiUtil.deleteNote(this.props.note);
    }
  },

  render: function () {
    return (
      <div className="notes-index-item" onClick={this.props.handleClick.bind(null, this.props.note)}>
        <div className="notes-index-item-text">
          <div>
            <span>{this.props.note.title}</span>
          </div>
        </div>
        <div onClick={this.deleteNote} className='trash'>
          <i className="material-icons">delete</i>
        </div>
      </div>
    );
  }
});

module.exports = NoteIndexItem;

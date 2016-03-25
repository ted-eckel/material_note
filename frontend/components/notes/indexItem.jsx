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
      <div>
        <div className="notes-index-item"
          onClick={this.props.handleClick.bind(null, this.props.note)}>
          <span>{this.props.note.title}</span>
          <br></br>
          <p onClick={this.deleteNote} className='trash'>
            <i className="material-icons">delete</i>
          </p>
        </div>
      </div>
    );
  }
});

module.exports = NoteIndexItem;

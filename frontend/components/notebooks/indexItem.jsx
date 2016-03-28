var React = require('react');
var ApiUtil = require('../../util/api_util');

var NotebookIndexItem = React.createClass({
  deleteNotebook: function (e) {
    e.preventDefault();
    var answer = confirm("Are you sure you want to delete this notebook?");
    if (answer) {
      ApiUtil.deleteNotebook(this.props.notebook);
    }
  },

  render: function () {
    if (!this.props.notebook) {
      return <div></div>;
    }
    return (
      <div className="notebook-index-item" onClick={this.props.handleClick.bind(null, this.props.notebook)}>
        <div className="notebook-index-item-text">
          <div>
            <span>
              {this.props.notebook.title}
            </span>
          </div>
        </div>
        <div onClick={this.deleteNotebook} className='trash'>
          <i className="material-icons">delete</i>
        </div>
      </div>
    );
  }
});

module.exports = NotebookIndexItem;

var React = require('react');
var NoteStore = require('../../stores/note_store');
var ApiUtil = require('../../util/api_util');
var ReactQuill = require("../../../node_modules/react-quill");
var Snackbar = require('material-ui/lib/snackbar');

var NoteShowPage = React.createClass({

  getNoteFromStore: function () {
    var splitPath = this.props.location.pathname.split("/");
    var id = splitPath[splitPath.length - 1];
    return NoteStore.find(parseInt(id));
  },

  _onChange: function () {
    this.setState({ note: this.getNoteFromStore() });
  },

  getInitialState: function () {
    return { note: this.getNoteFromStore(), open: false };
  },

  componentDidMount: function () {
    this.NoteStoreListener = NoteStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.NoteStoreListener.remove();
  },

  onTextChange: function(value) {
    var note = this.state.note;
    note.body = value;
    this.setState({ note: note });
  },

  saveChanges: function () {
    ApiUtil.updateNote(this.state.note);
  },

  handleTouchTap: function() {
    this.setState({
      open: true,
    });
  },

  handleRequestClose: function() {
    this.setState({
      open: false,
    });
  },

  render: function () {
    if(!this.state.note){
      return <div></div>;
    }

    return (
      <div className="NoteShowPage">
        <br/>
        <br/>
        <br/>
        <br/>
        <button className="save-button mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-color-text--white mdl-js-ripple-effect" onClick={this.saveChanges} onTouchTap={this.handleTouchTap}>SAVE CHANGES</button>
        <br/>
        <br/>
        <ReactQuill theme="snow"
                    value={this.state.note.body}
                    onChange={this.onTextChange}/>
        <Snackbar
          open={this.state.open}
          message="Note saved!"
          autoHideDuration={3000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    );
  }
});

module.exports = NoteShowPage;

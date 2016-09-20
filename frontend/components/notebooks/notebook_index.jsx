var React = require('react');

var NoteBookStore = require('../../stores/notebook_store');

var NotebookActions = require('../../actions/notebook_actions');

var NotebookIndexItem = require('./indexItem');
var NoteIndex = require('../notes/note_index');

import FlatButton from 'material-ui/FlatButton';

var NotebookIndex = React.createClass({

  getInitialState: function () {
    return {
      notebooks: NoteBookStore.all(),
      selectedNotebook: null
    };
  },

  componentDidMount: function () {
    this.NoteBookStoreListener = NoteBookStore.addListener(this._onChange);
    NotebookActions.fetchNotebooks();
  },

  _onChange: function () {
    this.setState({
      notebooks: NoteBookStore.all(),
     });
  },

  selectNotebook: function (notebook) {
    this.setState({ selectedNotebook: notebook });
  },

  unselectNotebook: function () {
    this.setState({ selectedNotebook: null });
  },

  render: function(){
    var notebooks = this.state.notebooks.map(function (notebook, idx) {
        return <NotebookIndexItem
          handleClick={this.selectNotebook}
          notebook={notebook}
          key={idx}/>;
      }.bind(this));

    if (this.state.selectedNotebook) {
      var notesIndex  = <NoteIndex notebook={this.state.selectedNotebook}/>;
      var selectedNotebookDisplay = <div>{notesIndex}</div>;
    }

    var backbutton = <FlatButton
                        label = "BACK TO NOTEBOOKS"
                        primary={true}
                        onClick={this.unselectNotebook}
                        style={{color: 'rgb(76, 175, 80)'}}
                        className="backtonotebooks-button"
                      ></FlatButton>

    return (
      <div className="notebook-container active">
        <div className="top-of-notebook-index">
          {selectedNotebookDisplay ? backbutton : <div/>}
        </div>
        <br></br>
        <div>
          {selectedNotebookDisplay ? selectedNotebookDisplay : notebooks}
        </div>
      </div>
    );
  }
});

module.exports = NotebookIndex;

var ApiUtil = require('../util/api_util');

var NoteActions = {
  fetchNotes: function(id){
    ApiUtil.fetchNotes(id);
  },
  createNote: function(note){
    ApiUtil.createNote(note);
  },
  updateNote: function(note){
    ApiUtil.updateNote(note);
  },
  deleteNote: function(note){
    ApiUtil.deleteNote(note);
  }
};

module.exports = NoteActions;

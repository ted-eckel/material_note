var AppDispatcher = require('../dispatcher/dispatcher');
var NoteConstants = require('../constants/note_constants');

var NoteActions = {
  receiveNotes: function (notes) {
    AppDispatcher.dispatch({
      actionType: NoteConstants.ALL_NOTES_RECEIVED,
      notes: notes
    });
  },

  addNote: function (note) {
    AppDispatcher.dispatch({
      actionType: NoteConstants.NOTE_CREATED,
      note: note
    });
  },

  updateNote: function (note) {
    AppDispatcher.dispatch({
      actionType: NoteConstants.NOTE_UPDATED,
      note: note
    });
  },

  deleteNote: function (note) {
    AppDispatcher.dispatch({
      actionType: NoteConstants.NOTE_DELETED,
      note: note
    });
  }
};

module.exports = NoteActions;

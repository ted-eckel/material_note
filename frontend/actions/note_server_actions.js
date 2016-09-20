var AppDispatcher = require('../dispatcher/dispatcher');

var NoteServerActions = {
  receiveNotes: function (notes) {
    AppDispatcher.dispatch({
      actionType: "ALL_NOTES_RECEIVED",
      notes: notes
    });
  },

  addNote: function (note) {
    AppDispatcher.dispatch({
      actionType: "NOTE_CREATED",
      note: note
    });
  },

  updateNote: function (note) {
    AppDispatcher.dispatch({
      actionType: "NOTE_UPDATED",
      note: note
    });
  },

  deleteNote: function (note) {
    AppDispatcher.dispatch({
      actionType: "NOTE_DELETED",
      note: note
    });
  }
};

module.exports = NoteServerActions;

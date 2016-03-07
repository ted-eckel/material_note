var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher'),
    _notes = [],
    NoteStore = new Store(AppDispatcher),
    NoteConstants = require('../constants/note_constants'),
    NotebookConstants = require('../constants/notebook_constants');

var resetNotes = function(notes){
  _notes = notes;
};

NoteStore.find = function (id) {
  return _notes.find(function (el) {
    return el.id === id;
  });
};

NoteStore.all = function () {
  return _notes.slice();
};

NoteStore.addNote = function (note) {
  _notes.push(note);
};

NoteStore.deleteNote = function (id) {
  for (var i = 0; i < _notes.length; i++) {
    if (_notes[i].id === id) {
      _notes.splice(i, 1);
    }
  }
};

NoteStore.updateNote = function (note) {
  for (var i = 0; i < _notes.length; i++) {
    if (_notes[i].id === note.id) {
      _notes[i] = note;
    }
  }
};

NoteStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case NoteConstants.ALL_NOTES_RECEIVED:
      resetNotes(payload.notes);
      NoteStore.__emitChange();
      break;
    case NoteConstants.NOTE_CREATED:
      NoteStore.addNote(payload.note);
      NoteStore.__emitChange();
      break;
    case NoteConstants.NOTE_DELETED:
      NoteStore.deleteNote(payload.note);
      NoteStore.__emitChange();
      break;
    case NoteConstants.NOTE_UPDATED:
      NoteStore.updateNote(payload.note);
      NoteStore.__emitChange();
      break;
    case NotebookConstants.DELETE_NOTEBOOK:
      _notes = [];
      NoteStore.__emitChange();
      break;
  }
};

module.exports = NoteStore;

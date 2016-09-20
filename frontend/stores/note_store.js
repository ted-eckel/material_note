var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher'),
    _notes = [],
    NoteStore = new Store(AppDispatcher);

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
    case "ALL_NOTES_RECEIVED":
      resetNotes(payload.notes);
      NoteStore.__emitChange();
      break;
    case "NOTE_CREATED":
      _notes.push(payload.note);
      NoteStore.__emitChange();
      break;
    case "NOTE_DELETED":
      NoteStore.deleteNote(payload.note);
      NoteStore.__emitChange();
      break;
    case "NOTE_UPDATED":
      NoteStore.updateNote(payload.note);
      NoteStore.__emitChange();
      break;
    case "DELETE_NOTEBOOK":
      _notes = [];
      NoteStore.__emitChange();
      break;
  }
};

module.exports = NoteStore;

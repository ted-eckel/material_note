var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var NoteBookStore = new Store(AppDispatcher);

var _noteBooks = [];

var resetNoteBooks = function (notebooks) {
  _noteBooks = notebooks;
};

NoteBookStore.all = function () {
  return _noteBooks.slice();
};

NoteBookStore.addNotebook = function (notebook) {
  _noteBooks.push(notebook);
};

NoteBookStore.deleteNotebook = function (id) {
  for (var i = 0; i < _noteBooks.length; i++) {
    if (_noteBooks[i].id === id) {
      _noteBooks.splice(i, 1);
    }
  }
};

NoteBookStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case "ALL_NOTEBOOKS_RECEIVED":
      resetNoteBooks(payload.notebooks);
      NoteBookStore.__emitChange();
      break;
    case "NOTEBOOK_ADDED":
      NoteBookStore.addNotebook(payload.notebook);
      NoteBookStore.__emitChange();
      break;
    case "DELETE_NOTEBOOK":
      NoteBookStore.deleteNotebook(payload.notebook);
      NoteBookStore.__emitChange();
      break;
  }
};

module.exports = NoteBookStore;

var AppDispatcher = require('../dispatcher/dispatcher');

var NotebookServerActions = {
  receiveAllNotebooks: function(notebooks){
    AppDispatcher.dispatch({
      actionType: "ALL_NOTEBOOKS_RECEIVED",
      notebooks: notebooks
    });
  },

  addNotebook: function (notebook) {
    AppDispatcher.dispatch({
      actionType: "NOTEBOOK_ADDED",
      notebook: notebook
    });
  },

  deleteNotebook: function (notebook) {
    AppDispatcher.dispatch({
      actionType: "DELETE_NOTEBOOK",
      notebook: notebook
    });
  }
};

module.exports = NotebookServerActions;

var AppDispatcher = require('../dispatcher/dispatcher');
var NotebookConstants = require('../constants/notebook_constants');

var NotebookActions = {
  receiveAllNotebooks: function(notebooks){
    AppDispatcher.dispatch({
      actionType: NotebookConstants.ALL_NOTEBOOKS_RECEIVED,
      notebooks: notebooks
    });
  },

  addNotebook: function (notebook) {
    AppDispatcher.dispatch({
      actionType: NotebookConstants.NOTEBOOK_ADDED,
      notebook: notebook
    });
  },

  deleteNotebook: function (notebook) {
    AppDispatcher.dispatch({
      actionType: NotebookConstants.DELETE_NOTEBOOK,
      notebook: notebook
    });
  }
};

module.exports = NotebookActions;

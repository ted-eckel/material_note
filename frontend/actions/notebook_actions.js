var ApiUtil = require('../util/api_util');

var NotebookActions = {
  fetchNotebooks: function(){
    ApiUtil.fetchNotebooks();
  },
  createNotebook: function(notebook){
    ApiUtil.createNotebook(notebook);
  },
  deleteNotebook: function(notebook){
    ApiUtil.deleteNotebook(notebook);
  }
};

module.exports = NotebookActions;

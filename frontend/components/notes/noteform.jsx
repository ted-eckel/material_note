var React = require('react'),
    ApiUtil = require('../../util/api_util'),
    LinkedStateMixin = require('react-addons-linked-state-mixin'),
    NotebookStore = require('../../stores/notebook_store');

var NoteForm = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function () {
    return ({
      title: "",
      body: ""
    });
  },

  createNote: function(e){
    e.preventDefault();
    ApiUtil.createNote({
      title: this.state.title,
      notebook_id: document.getElementById("selectList").value,
      body: this.state.body
    });
    this.setState({title: '', body: ''});
    this.props.hideModal();
  },

  render: function(){
    var NotebookDropDownOptions = NotebookStore.all().map(function (notebook, idx) {
      return (<option value={notebook.id}
                      key={idx}>{notebook.title}
              </option>);
    });

    var NotebookDefaultValue = NotebookStore.first().map(function (notebook) {
      return (notebook.id);
    });

    return(
      <form role='form' onSubmit={this.createNote}>

        <div className='form-group'>
         <label className='form-label'>
           <br/>
           Notebook:
           <br/>
           <br/>
         </label>
           <br/>
           <br/>
           <div className="centered-dropdown-options">
             <select className='form-control' id="selectList" style={{width: '300px', margin: '0 auto'}}>
               {NotebookDropDownOptions}
             </select>
           </div>
           <br/>
           <br/>
         {/*
           <select className="mdl-menu mdl-menu--bottom-left mdl-js-menu mdl-js-ripple-effect form-control" id="selectList">
           {NotebookDropDownOptions}
           </select>
           return (<option value={notebook.id} key={idx} className="mdl-menu__item">{notebook.title}</option>);
           */}

           <label className='form-label'>
             <br/>
             Note Title:
             <br/>
             <br/>
           </label>
           <br/>
           <br/>
           <div className="mdl-textfield mdl-js-textfield" style={{left: '20%'}}>
             <input className='form-control mdl-textfield__input' type='text' valueLink={this.linkState('title')}/>
           </div>
           <br/>
           <br/>
           <label className='form-label'>
             <br/>
             Note Body:
             <br/>
             <br/>
           </label>
           <br/>
           <br/>
           <div className="mdl-textfield mdl-js-textfield" style={{left: '20%'}}>
             <textarea className='form-control mdl-textfield__input' type='text' valueLink={this.linkState('body')}/>
           </div>
          </div>

        <button id="create-note-button" type="submit" className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-color-text--white mdl-js-ripple-effect">Create Note</button>
        <br/>
        <br/>
        <br/>
      </form>
    );
  }
});

module.exports = NoteForm;
